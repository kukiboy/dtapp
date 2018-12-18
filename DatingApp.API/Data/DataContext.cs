using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base (options){}

        public DbSet <Vlera> Vlerat { get; set; }
        public DbSet<Perdorues> Perdoruesit { get; set; }
        public DbSet<Foto> Fotot { get; set; }
        public DbSet<Pelqim> Pelqimet { get; set; }
        public DbSet<Mesazh> Mesazhet { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Pelqim>()
                .HasKey(k => new {k.PelqyesId, k.PelqyerId});
            
            builder.Entity<Pelqim>()
                .HasOne(p => p.Pelqyer)
                .WithMany(p => p.Pelqyesit)
                .HasForeignKey(p => p.PelqyerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Pelqim>()
                .HasOne(p => p.Pelqyes)
                .WithMany(p => p.Pelqyerit)
                .HasForeignKey(p => p.PelqyesId)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Mesazh>()
                .HasOne(p => p.Dergues)
                .WithMany(m => m.MesazhetDerguara)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Mesazh>()
                .HasOne(p => p.Marres)
                .WithMany(m => m.MesazhetPranuara)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}