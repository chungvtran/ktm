using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Services.Implement
{
    /// <summary>
    /// - The email sender service send email synchronously/asynchronously through SendEmail/SendEmailAsync
    /// - Private helper functions
    ///     + CreateEmail from the content provided
    ///     + Send/SendAsync: send email through SmtpClient
    /// </summary>
    public class EmailSenderService : IEmailSenderService
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSenderService(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendEmail(EmailContent content)
        {
            var email = CreateEmail(content);

            Send(email);
        }

        public async Task SendEmailAsync(EmailContent content)
        {
            var email = CreateEmail(content);

            await SendAsync(email);
        }

        private MimeMessage CreateEmail(EmailContent content)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.From));
            email.To.AddRange(content.To);
            email.Subject = content.Subject;
            // The email content is in html format
            var bodyBuilder = new BodyBuilder { HtmlBody = string.Format("<h2 style='color:red;'>{0}</h2>", content.Message) };
            // Check if the request contain any file attachment
            if (content.Attachments != null && content.Attachments.Any())
            {
                byte[] fileBytes;
                foreach (var attachment in content.Attachments)
                {
                    using (var ms = new MemoryStream())
                    {
                        attachment.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }

                    bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
                }
            }
            email.Body = bodyBuilder.ToMessageBody();
            return email;
        }
        
        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);

                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception, or both.
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}
