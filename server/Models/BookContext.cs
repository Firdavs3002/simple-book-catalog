using Microsoft.EntityFrameworkCore;

namespace BookCatalog.Models;

public class BookContext : DbContext {
    public BookContext(DbContextOptions<BookContext> options)
    : base(options){
    }

    public DbSet<BookItem> BookItems { get; set; } = null!;

    public DbSet<CommentItem> CommentItems { get; set; } = null!;

}

// public class CommentContext : DbContext {
//     public CommentContext(DbContextOptions<CommentContext> options)
//     : base(options){
//     }

//     public DbSet<CommentItem> CommentItems { get; set; } = null!;

// }