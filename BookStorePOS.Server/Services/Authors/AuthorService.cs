using BookStorePOS.Server.Models;
using BookStorePOS.Server.Services.Books;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json;

namespace BookStorePOS.Server.Services.Authors
{
    public class AuthorService(IHttpClientFactory factory, IBookService bookService) : IAuthorService
    {

        private HttpClient _httpClient = factory.CreateClient();

        private readonly IBookService _bookService = bookService;

        private string _url = "https://fakerestapi.azurewebsites.net/api/v1/Authors";

        async public Task<IActionResult> GetAllAuthors()
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"{_url}");
            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }

        async public Task<IActionResult> GetAuthor(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"{_url}/{id}");

            try
            {
                var author = await response.Content.ReadFromJsonAsync<Author>();
                if (author is null)
                {
                    var invalidContent = await response.Content.ReadAsStringAsync();

                    return new ContentResult
                    {
                        Content = invalidContent,
                        ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                        StatusCode = (int)response.StatusCode
                    };
                }

                var serializeOptions = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };


                var bookResponse = (ContentResult)await _bookService.GetBook(author.IdBook);

                if (bookResponse.Content is null)
                {
                    var contentWithoutBook = System.Text.Json.JsonSerializer.Serialize(author);

                    return new ContentResult
                    {
                        Content = contentWithoutBook,
                        ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                        StatusCode = (int)response.StatusCode
                    };
                }

                var book = JsonConvert.DeserializeObject<Book>(bookResponse.Content);

                author.Book = book;

                var content = System.Text.Json.JsonSerializer.Serialize(author);


                return new ContentResult
                {
                    Content = content,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            } 
            catch (Exception)
            {
                var invalidContent = await response.Content.ReadAsStringAsync();

                return new ContentResult
                {
                    Content = invalidContent,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            }
            
        }

        async public Task<IActionResult> AddAuthor(Author? author)
        {

            var jsonBook = JsonConvert.SerializeObject(author);
            var body = new StringContent(jsonBook, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync($"{_url}", body);

            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }

        async public Task<IActionResult> UpdateAuthor(int id, Author? author)
        {
            var jsonBook = JsonConvert.SerializeObject(author);
            var body = new StringContent(jsonBook, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PutAsync($"{_url}/{id}", body);

            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }


        async public Task<IActionResult> DeleteAuthor(int id)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync($"{_url}/{id}");

            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            }; ;

        }


    }
}
