using Hangfire;
using System;
using System.Collections.Generic;
using System.Text;

namespace KMS.Product.Ktm.Services.Hangfire
{
    public static class HangfireJobScheduler 
    {
        public static void ScheduleRecurringJob()
        {
            RecurringJob.RemoveIfExists(nameof(TeamService.TeamService));
            RecurringJob.AddOrUpdate<TeamService.TeamService>(nameof(TeamService),
                job => job.Run(JobCancellationToken.Null),
                Cron.MinuteInterval(1), TimeZoneInfo.Local);

            //RecurringJob.RemoveIfExists(nameof(EmployeeService.EmployeeService));
            //RecurringJob.AddOrUpdate<EmployeeService.EmployeeService>(nameof(EmployeeService),
            //    job => job.Run(JobCancellationToken.Null),
            //    Cron.MinuteInterval(1), TimeZoneInfo.Local);
        }
    }
}
