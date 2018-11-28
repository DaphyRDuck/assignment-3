using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using assignment3.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace assignment3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {

        private readonly MusicContext _context;

        public MusicController(MusicContext context)
        {
            _context = context;

            if (_context.Musics.Count() == 0)
            {

                _context.Musics.Add(new Music
                {
                    Name = "No Music",
                    Author = "No Author",
                    Details = "No Details"
                });

                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Music>> GetAll()
        {
            return _context.Musics.ToList();
        }

        [HttpGet("{id}", Name = "GetMusic")]
        public ActionResult<Music> GetById(long id)
        {
            var item = _context.Musics.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        [HttpPost]
        public IActionResult Create(Music item)
        {
            _context.Musics.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetMusic", new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, Music item)
        {
            var todo = _context.Musics.Find(id);
            if (todo == null)
            {
                return NotFound();
            }
            
            todo.Name = item.Name;
            todo.Author = item.Author;
            todo.Details = item.Details;

            _context.Musics.Update(todo);
            _context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var todo = _context.Musics.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Musics.Remove(todo);
            _context.SaveChanges();
            return NoContent();
        }
    }
}