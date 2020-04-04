﻿using KMS.Product.Ktm.Api.Models.Events;
using KMS.Product.Ktm.Services.SlackService;
using Microsoft.AspNetCore.Mvc;

namespace KMS.Product.Ktm.KudosReceiver.Controllers
{
    [Route("slack/[controller]")]
    [ApiController]
    public class ActionEndpointController : ControllerBase
    {
        private readonly ISlackService slackService;
        public ActionEndpointController(ISlackService slackService)
        {
            this.slackService = slackService;
        }

        /// <summary>Get Method for testing.</summary>
        /// <returns>Test data</returns>
        [HttpGet]
        public SlackEvent Get()
        {
            return new SlackEvent { Challenge = "OK" };
        }

        /// <summary>Post method the specified data.</summary>
        /// <param name="data">The Slack request payload.</param>
        /// <returns>data.Challenge</returns>
        [HttpPost]
        public string Post([FromBody] SlackEvent data)
        {
            var result = data?.Challenge;
            var sender =  slackService.Users?[data?.Event.User];
            if (sender?.is_bot ?? true) return result;
            slackService.SendConfirmationResponse(sender, data?.Event.Text);
            slackService.SendInformMessages(sender, data?.Event.Text);
            return result;
        }
    }
}