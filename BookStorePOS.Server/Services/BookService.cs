﻿using BookStorePOS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace BookStorePOS.Server.Services
{
    public class BookService(IHttpClientFactory factory) : IBookService
    {

        private HttpClient _httpClient = factory.CreateClient();

        private string _url = "https://fakerestapi.azurewebsites.net/api/v1";

        async public Task<IActionResult> GetAllBooks()
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"{_url}/Books");
            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult 
            { 
                Content = content, 
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json", 
                StatusCode = (int)response.StatusCode 
            };
        }

        async public Task<IActionResult> GetBook(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"{_url}/Books/{id}");
            
            var content = await response.Content.ReadAsStringAsync();
            

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }

        async public Task<IActionResult> AddBook(Book? book)
        {

            var jsonBook = JsonConvert.SerializeObject(book);
            var body = new StringContent(jsonBook, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync($"{_url}/Books/", body);

            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }

        async public Task<IActionResult> UpdateBook(int id, Book? book)
        {
            var jsonBook = JsonConvert.SerializeObject(book);
            var body = new StringContent(jsonBook, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PutAsync($"{_url}/Books/{id}", body);

            var content = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                Content = content,
                ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                StatusCode = (int)response.StatusCode
            };
        }


        async public Task<IActionResult> DeleteBook(int id)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync($"{_url}/Books/{id}");

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