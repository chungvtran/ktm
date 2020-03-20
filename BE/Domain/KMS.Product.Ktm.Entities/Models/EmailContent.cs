using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KMS.Product.Ktm.Entities.Models
{
    public class EmailContent
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public IFormFileCollection Attachments { get; set; }

        public EmailContent(IEnumerable<string> to, string subject, string message, IFormFileCollection attachments)
        {
            To = new List<MailboxAddress>();

            To.AddRange(to.Select(x => new MailboxAddress(x)));
            Subject = subject;
            Message = message;
            Attachments = attachments;
        }
    }
}
