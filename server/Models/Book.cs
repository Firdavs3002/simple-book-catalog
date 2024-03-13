using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace BookCatalog.Models;

public class BookItem {
    [SwaggerSchema(ReadOnly = true)]
    public long Id { get; set; }
    public string Name { get; set; }
    public string Author { get; set; }
    public decimal Price { get; set; }
    public int Year { get; set; }
    public string Language { get; set; }

    public BookItem(string name, string author, decimal price, int year, string language) {
        Name = name;
        Author = author;
        Price = price;
        Year = year;
        Language = language;
    }
}

public class CommentItem {
    [SwaggerSchema(ReadOnly = true)]
    public long Id { get; set; }

    [JsonPropertyName("user_name")]
    public string UserName { get; set; }
    public string Body { get; set; }

    [JsonPropertyName("book_id")]
    [SwaggerSchema(ReadOnly = true)]

    public long? BookItemId { get; set; }

    [JsonIgnore]

    public BookItem? Book { get; set; }

    public CommentItem(string userName, string body) {
        UserName = userName;
        Body = body;
    }
}