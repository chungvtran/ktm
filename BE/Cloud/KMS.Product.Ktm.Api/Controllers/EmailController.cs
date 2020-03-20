using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KMS.Product.Ktm.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSenderService _emailSenderService;

        public EmailController(IEmailSenderService emailSenderService)
        {
            _emailSenderService = emailSenderService;
        }

        // GET: api/Email
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var emailContent = new EmailContent(new string[] { "ktms.test02@gmail.com" }, "Test email", "This is the content from our email.", null);
            _emailSenderService.SendEmail(emailContent);
            return new string[] { "value1", "value2" };
        }

        // GET: api/Email/async
        [HttpGet("async")]
        public async Task<IEnumerable<string>> GetAsync()
        {
            var emailContent = new EmailContent(new string[] { "ktms.test02@gmail.com" }, "Test email async", "This is the content from our async email.", null);
            await _emailSenderService.SendEmailAsync(emailContent);
            return new string[] { "value1", "value2" };
        }

        // POST: api/Email/attachment
        [HttpPost("attachment")]
        public async Task PostAsync()
        {
            var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();

            var emailContent = new EmailContent(new string[] { "ktms.test02@gmail.com" }, "Test email with attachments", "This is the content from our async email with attachments.", files);
            await _emailSenderService.SendEmailAsync(emailContent);
        }
    }
}
