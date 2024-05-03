namespace Bookstore_Management.Models
{
    public class Book
    {
        public int Id { get; set; } // Identificatorul unic al cărții
        public string Title { get; set; } // Titlul cărții
        public string Author { get; set; } // Autorul cărții
        public string Genre { get; set; } // Genul cărții
        public decimal Price { get; set; } // Prețul cărții
        public DateTime PublishedDate { get; set; } // Data publicării cărții
    }
}
