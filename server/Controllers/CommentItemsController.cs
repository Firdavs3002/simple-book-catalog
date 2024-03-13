using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookCatalog.Models;

namespace server.Controllers
{
    [Route("api/books/{book_id}/comments")]
    [ApiController]
    public class CommentItemsController : ControllerBase
    {
        private readonly BookContext _context;

        public CommentItemsController(BookContext context)
        {
            _context = context;
        }

        // GET: api/CommentItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentItem>>> GetCommentItems(long book_id)
        {
            return await _context.CommentItems.Where(b => b.BookItemId == book_id).ToListAsync();
        }

        // GET: api/CommentItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentItem>> GetCommentItem(long book_id, long id)
        {
            var commentItem = await _context.CommentItems.FindAsync(book_id, id);

            if (commentItem == null)
            {
                return NotFound();
            }

            return commentItem;
        }

        // PUT: api/CommentItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentItem(long book_id, long id, CommentItem commentItem)
        {
            commentItem.Id = id;
            commentItem.BookItemId = book_id;
            
            _context.Entry(commentItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CommentItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommentItem>> PostCommentItem(long book_id, CommentItem commentItem)
        {
            commentItem.BookItemId = book_id;

            _context.CommentItems.Add(commentItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentItem), new { id = commentItem.Id, book_id = book_id }, commentItem);
        }

        // DELETE: api/CommentItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommentItem(long book_id, long id)
        {
            var commentItem = await _context.CommentItems.FindAsync(id);
            if (commentItem == null)
            {
                return NotFound();
            }

            _context.CommentItems.Remove(commentItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentItemExists(long id)
        {
            return _context.CommentItems.Any(e => e.Id == id);
        }
    }
}
