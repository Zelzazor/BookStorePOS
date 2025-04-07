using BookStorePOS.Server.Models;
using BookStorePOS.Server.Services.Authors;
using Microsoft.AspNetCore.Mvc;

namespace BookStorePOS.Server.Controllers
{
    [ApiController]
    [Route("api/authors")]
    public class AuthorController(IAuthorService authorService) : ControllerBase
    {
        private readonly IAuthorService _authorService = authorService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _authorService.GetAllAuthors();
            return books;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var author = await _authorService.GetAuthor(id);
            return author;

        }

        [HttpPost]
        public async Task<IActionResult> AddAuthor([FromBody] Author author)
        {
            var newAuthor = await _authorService.AddAuthor(author);

            return newAuthor;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] Author author)
        {
            var updatedAuthor = await _authorService.UpdateAuthor(id, author);

            return updatedAuthor;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var deletedAuthor = await _authorService.DeleteAuthor(id);

            return deletedAuthor;

        }
    }
}
