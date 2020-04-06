using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.RepoInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(KtmDbContext context, ILogger<Employee> logger) : base(context, logger)
        {
        }

        /// <summary>
        /// Get all employees
        /// </summary>
        /// <returns>A collection of all employees</returns>
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await Task.FromResult(GetAll().Include(e => e.EmployeeTeams).ToList());
        }
    }
}
