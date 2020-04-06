using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KMS.Product.Ktm.Api.Exceptions;
using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.EmployeeService;
using KMS.Product.Ktm.Services.TeamService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KMS.Product.Ktm.Api.Controllers
{
    /// <summary>
    /// Controller used for testing with postman purpose
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly IEmployeeService _empService;
        
        public TestController(ITeamService teamService, IEmployeeService empService)
        {
            _teamService = teamService ?? throw new ArgumentNullException($"{nameof(teamService)}");
            _empService = empService ?? throw new ArgumentNullException($"{nameof(empService)}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTestsAsync()
        {
            try
            {
                //await _teamService.SyncTeamDatabaseWithKmsAsync(DateTime.Now);
                //await _empService.SyncEmployeeDatabaseWithKms(DateTime.Now);
                return Ok();
            }
            catch(BussinessException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
