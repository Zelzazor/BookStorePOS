using BookStorePOS.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStorePOS.Server.Services.Authors
{
    public interface IAuthorService
    {
        Task<IActionResult> GetAllAuthors();

        Task<IActionResult> GetAuthor(int id);

        Task<IActionResult> AddAuthor(Author? author);

        Task<IActionResult> UpdateAuthor(int id, Author? author);

        Task<IActionResult> DeleteAuthor(int id);
    }
}
