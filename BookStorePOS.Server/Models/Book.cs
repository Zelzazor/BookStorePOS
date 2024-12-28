using System.Text.Json.Serialization;

namespace BookStorePOS.Server.Models
{
    public class Book
    {
        [JsonPropertyName("id")]
        public required int Id { get; set; }
        [JsonPropertyName("title")]
        public required string Title { get; set; }

        [JsonPropertyName("description")]
        public required string Description { get; set; }

        [JsonPropertyName("pageCount")]
        public required int PageCount { get; set; }

        [JsonPropertyName("excerpt")]
        public required string Excerpt { get; set; }


        [JsonPropertyName("publishDate")]
        public required DateTime PublishDate { get; set; }
    }
}
