using System.Collections.Generic;
using Bookstore_Management.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudController : ControllerBase
    {
        private readonly IBookRepository _bookRepository; // Presupunând că avem un serviciu pentru gestionarea cărților

        public CrudController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        // GET: api/Crud
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _bookRepository.GetAll();
            return Ok(books);
        }

        // GET: api/Crud/5
        [HttpGet("{id}", Name = "GetBook")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookRepository.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        // POST: api/Crud
        [HttpPost]
        public IActionResult CreateBook([FromBody] Book book)
        {
            _bookRepository.Add(book);
            return CreatedAtRoute("GetBook", new { id = book.Id }, book);
        }

        // PUT: api/Crud/5
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            var existingBook = _bookRepository.GetById(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Genre = book.Genre;
            existingBook.Price = book.Price;
            existingBook.PublishedDate = book.PublishedDate;

            _bookRepository.Update(existingBook);
            return NoContent();
        }

        // DELETE: api/Crud/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var existingBook = _bookRepository.GetById(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            _bookRepository.Delete(existingBook);
            return NoContent();
        }
    }
}
