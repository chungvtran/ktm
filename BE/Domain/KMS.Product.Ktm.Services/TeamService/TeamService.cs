﻿using AutoMapper;
using Hangfire;
using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.EntitiesServices.DTOs;
using KMS.Product.Ktm.EntitiesServices.Responses;
using KMS.Product.Ktm.Services.AuthenticateService;
using KMS.Product.Ktm.Services.RepoInterfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Services.TeamService
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;
        private readonly IAuthenticateService _authenticateService;
        private readonly ILogger<TeamService> _logger;

        public const string KmsTeamRequestUrl = "https://hr.kms-technology.com/api/projects/ReturnListProjectClient";

        /// <summary>
        /// Inject Team repository, AutoMapper, Authenticate service, Logger 
        /// </summary>
        /// <returns></returns>
        public TeamService(ITeamRepository teamRepository, IMapper mapper, IAuthenticateService authenticateService, ILogger<TeamService> logger)
        {
            _teamRepository = teamRepository ?? throw new ArgumentNullException($"{nameof(teamRepository)}");
            _mapper = mapper ?? throw new ArgumentNullException($"{nameof(mapper)}");
            _authenticateService = authenticateService ?? throw new ArgumentNullException($"{nameof(authenticateService)}");
            _logger = logger ?? throw new ArgumentNullException($"{nameof(logger)}");
        }

        /// <summary>
        /// Get all teams
        /// </summary>
        /// <returns>A collection of all teams</returns>
        public async Task<IEnumerable<Team>> GetAllTeamsAsync()
        {
            return await _teamRepository.GetTeamsAsync();
        }

        /// <summary>
        /// Get team by id
        /// </summary>
        /// <returns>Team by id</returns>
        public async Task<Team> GetTeamByIdAsync(int teamId)
        {
            return await _teamRepository.GetByIdAsync(teamId);
        }
        /// <summary>
        /// Create a new team
        /// </summary>
        /// <returns></returns>
        public async Task CreateTeamAsync(Team team)
        {
            await _teamRepository.InsertAsync(team);
        }

        /// <summary>
        /// Update an existent team
        /// </summary>
        /// <returns></returns>
        public async Task UpdateTeamAsync(Team team)
        {
            await _teamRepository.UpdateAsync(team);
        }

        /// <summary>
        /// Delete an existent team
        /// </summary>
        /// <returns></returns>
        public async Task DeleteTeamAsync(Team team)
        {
            await _teamRepository.DeleteAsync(team);
        }

        /// <summary>
        /// Get team id from team name
        /// </summary>
        /// <param name="teamName"></param>
        /// <returns>
        /// If team exists, return team id
        /// Else, create a new team and return that new team id
        /// </returns>s
        public async Task<int> GetTeamIdByTeamNameAsync(string teamName)
        {
            var team = (await _teamRepository.GetTeamsByConditionAsync(t => t.TeamName == teamName)).SingleOrDefault();

            if (team == null)
            {
                var newTeam = new Team()
                {
                    TeamName = teamName
                };
                await CreateTeamAsync(newTeam);
                return newTeam.Id;
            }

            return team.Id;
        }

        /// <summary>
        /// There are 3 cases when syncing:
        /// 1. New teams
        ///     Add new teams to database
        /// 2. Active teams
        /// 3. Disband teams
        /// </summary>
        /// <returns></returns>
        public async Task SyncTeamDatabaseWithKmsAsync(DateTime now)
        {
            _logger.LogInformation("Start sync team");
            // Fetch teams from KMS and map from DTO to Team
            var fetchedTeamsDto = await GetTeamsFromKmsAsync();
            var fetchedDistinctTeamsDto = fetchedTeamsDto.GroupBy(t => t.TeamName)
                .Select(t => t.First())
                .ToList();
            var fetchedTeams = _mapper.Map<IEnumerable<KmsTeamDTO>, IEnumerable<Team>>(fetchedDistinctTeamsDto);
            // Get teams from database
            var databaseTeams = await GetAllTeamsAsync();
            // Get team names
            var fetchedTeamNames = fetchedTeams.Select(e => e.TeamName).ToList();
            var databaseTeamNames = databaseTeams.Select(e => e.TeamName).ToList();
            // Sync new teams
            var newTeams = fetchedTeams.Where(e => !databaseTeamNames.Contains(e.TeamName));
            await SyncNewTeams(newTeams);
            // Sync active teams
            var activeTeams = fetchedTeams.Where(e => databaseTeamNames.Contains(e.TeamName));
            Dictionary<string, int> map = databaseTeams.ToDictionary(x => x.TeamName, x => x.Id);
            foreach(var item in activeTeams)
            {
                if (map.ContainsKey(item.TeamName))
                {
                    item.Id = map[item.TeamName];
                }
            }
            await SyncActiveTeams(activeTeams);
            // Sync disband teams
            var disbandTeams = databaseTeams.Where(e => !fetchedTeamNames.Contains(e.TeamName));
            await SyncDisbandTeams(disbandTeams);
        }

        /// <summary>
        /// Used for Hangfire scheduler
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task Run(IJobCancellationToken token)
        {
            token.ThrowIfCancellationRequested();
            await SyncTeamDatabaseWithKmsAsync(DateTime.Now);
        }

        /// <summary>
        /// Get all teams from KMS by KMS API
        /// API: https://hr.kms-technology.com/api/projects/ReturnListProjectClient
        /// </summary>
        /// <returns>A collection of all KMS team DTOs</returns>
        private async Task<IEnumerable<KmsTeamDTO>> GetTeamsFromKmsAsync()
        {
            var kmsTeamDTOs = new List<KmsTeamDTO>();
            // Initialize httpclient with token from login service to send request to KMS HRM 
            var bearerToken = _authenticateService.AuthenticateUsingToken();
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
            var response = await client.GetAsync(KmsTeamRequestUrl);

            if (response.StatusCode == HttpStatusCode.OK)
            {
                // Convert response JSON to object
                var contentString = await response.Content.ReadAsStringAsync();
                //var kmsTeamResponse = JsonConvert.DeserializeObject<KmsTeamResponse>(contentString);
                var jsonKmsTeamDTOs = JsonConvert.DeserializeObject<IEnumerable<KmsTeamDTO>>(contentString);
                // Add KMS team DTOs to list
                //KmsTeamDTOs.AddRange(kmsTeamResponse.KmsTeamDTOs);
                kmsTeamDTOs.AddRange(jsonKmsTeamDTOs);
            }

            return kmsTeamDTOs;
        }

        /// <summary>
        /// Add new teams from KMS 
        /// </summary>
        /// <param name="newTeams"></param>
        /// <returns></returns>
        private async Task SyncNewTeams(IEnumerable<Team> newTeams)
        {
            foreach (var newTeam in newTeams)
            {
                await CreateTeamAsync(newTeam);
            }
        }

        /// <summary>
        /// Update active teams in database 
        /// </summary>
        /// <param name="activeTeams"></param>
        /// <returns></returns>
        private async Task SyncActiveTeams(IEnumerable<Team> activeTeams)
        {
            foreach (var activeTeam in activeTeams)
            {
                await UpdateTeamAsync(activeTeam);
            }
        }

        /// <summary>
        /// Update disband teams in database 
        /// </summary>
        /// <param name="disbandTeams"></param>
        /// <returns></returns>
        private async Task SyncDisbandTeams(IEnumerable<Team> disbandTeams)
        {
            foreach (var disband in disbandTeams)
            {
                await UpdateTeamAsync(disband);
            }
        } 
    }
}
