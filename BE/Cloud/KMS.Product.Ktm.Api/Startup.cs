using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using KMS.Product.Ktm.Api.Authentication;
using KMS.Product.Ktm.Repository;
using KMS.Product.Ktm.Services.Interfaces;
using KMS.Product.Ktm.Services.Implement;
using KMS.Product.Ktm.Entities.Models;
using Microsoft.AspNetCore.Http.Features;

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
            services.AddAuthentication("KmsTokenAuth")
                .AddScheme<KmsTokenAuthOptions, KmsTokenAuthHandler>("KmsTokenAuth", "KmsTokenAuth", opts => { });
            services.AddScoped<KtmDbContext>(_ => new KtmDbContext(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            // Get email configuration for instance of type EmailConfiguration 
            var emailConfig = Configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            // Config file properties for api body containing form-data 
            services.Configure<FormOptions>(options => {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = int.MaxValue;
                options.MemoryBufferThreshold = int.MaxValue;
            });
            // Inject email service and configuration
            services.AddSingleton(emailConfig);
            services.AddSingleton(typeof(IEmailSenderService), typeof(EmailSenderService));            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
