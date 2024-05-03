using Microsoft.EntityFrameworkCore;

namespace Bookstore_Management.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Definirea entităților (tabelelor) din baza de date
        public DbSet<Book> Books { get; set; }

        // Adaugă alte entități aici, dacă este necesar

        // Puteți adăuga și configurații suplimentare aici, cum ar fi definirea cheilor primare sau restricțiilor
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Exemplu: Configurare cheie primară pentru entitatea Book
            modelBuilder.Entity<Book>()
                .HasKey(b => b.Id);
        }
    }
}
