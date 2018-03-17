using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class ApplicationContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        private IConfigurationRoot _config;
        public ApplicationContext(DbContextOptions options, IConfigurationRoot config)
            : base(options) => _config = config;

        public DbSet<Shareholder> Shareholders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["Data:ConnectionString"]);
        }
    }
}
