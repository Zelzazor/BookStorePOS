using System.Text.Json.Serialization;


namespace BookStorePOS.Server.Models
{
    public class Author
    {
        [JsonPropertyName("id")]
        public required int Id { get; set; }

        [JsonPropertyName("firstName")]
        public required string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public required string LastName { get; set; }

        [JsonPropertyName("idBook")]
        public required int IdBook { get; set; }

        [JsonPropertyName("book")]
        public Book? Book { get; set; }


    }
}
