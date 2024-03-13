namespace BookCatalog.Models

public class BookItem {
    public long Id { get; set; }
    public string Name { get; set; }
    public string Author { get; set; }
    public decimal Price { get; set; }
    public int Year { get; set; }
    public string Language { get; set; }
}