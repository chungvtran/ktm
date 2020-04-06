﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using KMS.Product.Ktm.Api.Exceptions;
using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.EmployeeService;
using KMS.Product.Ktm.Services.TeamService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KMS.Product.Ktm.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private const string UserInfoRequestUrl = "https://home.kms-technology.com/api/account/authenticate";

        public AccountController()
        {
        }

        /// <summary>
        /// api/me
        /// Get user information by token through KMS API
        /// </summary>
        /// <returns>
        /// - Status OK 200 with user information
        /// - Status Unauthorized 401 if token expires or invalid token
        /// </returns>
        [HttpGet("me")]
        public async Task<IActionResult> GetUserInforAsync()
        {
            try
            {
                HttpClient client = new HttpClient();
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.GetAsync(UserInfoRequestUrl);
                if (response.StatusCode == HttpStatusCode.OK)
                {                    
                    return Ok(await response.Content.ReadAsStringAsync());
                }
                else
                {
                    return Unauthorized("Invalid token");
                }
            }
            catch(BussinessException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
