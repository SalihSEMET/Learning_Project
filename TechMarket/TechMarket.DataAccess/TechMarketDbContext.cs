using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TechMarket.Entity;
using TechMarket.Entity.Entities;

namespace TechMarket.DataAccess
{
    public class TechMarketDbContext : IdentityDbContext<AppUser>
    {
        public TechMarketDbContext(DbContextOptions<TechMarketDbContext> options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(x => x.Price).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Product>().Property(x => x.Title).IsRequired();
            modelBuilder.Entity<Product>().Property(x => x.Description).IsRequired();
            modelBuilder.Entity<Product>().Property(x => x.Title).HasMaxLength(100);
            modelBuilder.Entity<Product>().Property(x => x.Description).HasMaxLength(500);
            modelBuilder.Entity<Product>().Property(x => x.Price).IsRequired();
        }
    }

}