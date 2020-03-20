using KMS.Product.Ktm.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Services.Interfaces
{
    public interface IEmailSenderService
    {
        void SendEmail(EmailContent message);
        Task SendEmailAsync(EmailContent message);
    }
}
