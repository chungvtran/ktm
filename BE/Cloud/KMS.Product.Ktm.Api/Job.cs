using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Api
{
    public interface IJob
    {
        Task RunAtTimeOf(DateTime now);
    }

    //public class MyJob : IJob
    //{
    //    private readonly ILogger<MyJob> _logger;
    //    private readonly MyDbContext _dbContext;

    //    public 
    //}
}
