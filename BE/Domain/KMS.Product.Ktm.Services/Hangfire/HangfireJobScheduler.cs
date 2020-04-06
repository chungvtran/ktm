using Hangfire;
using System;
using System.Collections.Generic;
using System.Text;

namespace KMS.Product.Ktm.Services.Hangfire
{
    public static class HangfireJobScheduler 
    {
        private const int TeamServiceInterval = 1;
        private const int EmployeeServiceInterval = 1;

        public static void ScheduleRecurringJob()
        {
            RecurringJob.RemoveIfExists(nameof(TeamService.TeamService));
            RecurringJob.AddOrUpdate<TeamService.TeamService>(nameof(TeamService),
                job => job.Run(JobCancellationToken.Null),
                Cron.MinuteInterval(TeamServiceInterval), TimeZoneInfo.Local);

            RecurringJob.RemoveIfExists(nameof(EmployeeService.EmployeeService));
            RecurringJob.AddOrUpdate<EmployeeService.EmployeeService>(nameof(EmployeeService),
                job => job.Run(JobCancellationToken.Null),
                Cron.MinuteInterval(EmployeeServiceInterval), TimeZoneInfo.Local);
        }
    }
}
