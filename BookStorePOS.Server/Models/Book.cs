namespace BookStorePOS.Server.Models
{
    public class Book
    {
        public required int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required int PageCount { get; set; }

        public int Excerpt { get; set; }

        public DateTime PublishDate { get; set; }
    }
}
