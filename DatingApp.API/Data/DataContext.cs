using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base (options){}

        public DbSet <Vlera> Vlerat { get; set; }
        public DbSet<Perdorues> Perdoruesit { get; set; }
    }
}