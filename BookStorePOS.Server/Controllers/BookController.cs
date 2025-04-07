using BookStorePOS.Server.Models;
using BookStorePOS.Server.Services.Books;
using Microsoft.AspNetCore.Mvc;

namespace BookStorePOS.Server.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BookController(IBookService bookService) : ControllerBase
    {


        private readonly IBookService _bookService = bookService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetAllBooks();
            return books;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var book = await _bookService.GetBook(id);
            return book;

        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody]Book book)
        {
            var newBook = await _bookService.AddBook(book);

            return newBook;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody]Book book)
        {
            var updatedBook = await _bookService.UpdateBook(id, book);

            return updatedBook;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var deletedBook = await _bookService.DeleteBook(id);

            return deletedBook;

        }


    }
}
