using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using KMS.Product.Ktm.Api.Authentication;
using KMS.Product.Ktm.Api.HostedService;
using KMS.Product.Ktm.Repository;
using KMS.Product.Ktm.Entities.Configurations;
using KMS.Product.Ktm.Services.KudoTypeService;
using KMS.Product.Ktm.Services.KudoService;
using KMS.Product.Ktm.Services.EmailService;
using KMS.Product.Ktm.Services.RepoInterfaces;
using AutoMapper;
using KMS.Product.Ktm.Services.TeamService;
using KMS.Product.Ktm.Services.EmployeeService;
using KMS.Product.Ktm.Services.AutoMapper;
using KMS.Product.Ktm.Services.AuthenticateService;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace KMS.Product.Ktm.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(); 

            //services.AddAuthentication()
            //    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)



            services.AddAuthentication("KmsTokenAuth")
                .AddScheme<KmsTokenAuthOptions, KmsTokenAuthHandler>("KmsTokenAuth", "KmsTokenAuth", opts => { });
            services.AddSingleton<IEmailConfiguration>(Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddDbContext<KtmDbContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), 
                b => b.MigrationsAssembly("KMS.Product.Ktm.Repository")));
            services.AddScoped<IKudoTypeService, KudoTypeService>();
            services.AddScoped<IKudoService, KudoService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IIdleEmailService, IdleEmailService>();
            services.AddScoped<IAuthenticateService, AuthenticateService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IKudoTypeRepository, KudoTypeRepository>();
            services.AddScoped<IKudoRepository, KudoRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfile));
            //// Add Hangfire services.
            //services.AddHangfire(configuration => configuration
            //    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            //    .UseSimpleAssemblyNameTypeSerializer()
            //    .UseRecommendedSerializerSettings()
            //    .UseSqlServerStorage(Configuration.GetConnectionString("HangfireConnection"), new SqlServerStorageOptions
            //    {
            //        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
            //        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
            //        QueuePollInterval = TimeSpan.Zero,
            //        UseRecommendedIsolationLevel = true,
            //        UsePageLocksOnDequeue = true,
            //        DisableGlobalLocks = true
            //    }));
            //// Add the processing server as IHostedService
            //services.AddHangfireServer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
