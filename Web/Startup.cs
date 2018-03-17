using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Web
{
    public class Startup
    {
        private readonly IConfigurationRoot _config;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddJsonFile("appsettings.json", true, true)
              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
              .AddEnvironmentVariables();

            _config = builder.Build();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(_config);
            services.AddDbContext<AppContext>(ServiceLifetime.Scoped);
            services.AddTransient<IdentityInitializer>();
            services.AddIdentity<IdentityUser, IdentityRole>()
              .AddEntityFrameworkStores<AppContext>();

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = _config["tokens:issuer"],
                    ValidAudience = _config["tokens:audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["tokens:key"])),
                    ValidateLifetime = true
                };
            });

            ConfigureApplicationCookie(services);

            services.AddMvc();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("SuperUsers", policy => policy.RequireClaim("SuperUser"));
            });
        }

        private static void ConfigureApplicationCookie(IServiceCollection services)
        {
            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = ctx =>
          {
              if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                  ctx.Response.StatusCode = 401;
              return Task.CompletedTask;
          };

                options.Events.OnRedirectToAccessDenied = ctx =>
          {
              if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                  ctx.Response.StatusCode = 401;
              return Task.CompletedTask;
          };
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
      IdentityInitializer identitySeeder)
        {

            loggerFactory.AddConsole(_config.GetSection("Logging"));
            loggerFactory.AddDebug();
            loggerFactory.AddFile("Logs/khodamooz-{Date}-log.txt");

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
              !Path.HasExtension(context.Request.Path.Value) &&
              !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            identitySeeder.Seed().Wait();
        }
    }
}
