using BookStorePOS.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStorePOS.Server.Services.Books
{
    public interface IBookService
    {
        Task<IActionResult> GetAllBooks();

        Task<IActionResult> GetBook(int id);

        Task<IActionResult> AddBook(Book? book);

        Task<IActionResult> UpdateBook(int id, Book? book);

        Task<IActionResult> DeleteBook(int id);
    }
}
