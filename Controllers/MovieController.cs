using MovieLibrary.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace MovieLibrary.Controllers
{
    public class MovieController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IHttpActionResult Get()
        {
            // Retrieve all movies from db logic
            IList<Movie> movies = db.Movies.ToList();

            if (movies.Count == 0)
            {
                return NotFound();
            }

            return Ok(movies);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {

            //retrieve movie by id from db logic
            Movie movie = db.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);

        }

        // POST api/values
        public void Post([FromBody] Movie movie)
        {
            db.Movies.Add(movie);
            db.SaveChanges();

        }

        // PUT api/values/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Movie movie)
        {
            // Update movie in db logic
            //throw new NotImplementedException();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != movie.MovieId)
            {
                return BadRequest();
            }
            Movie movieEdit = db.Movies.Where(m => m.MovieId == id).FirstOrDefault();

            movieEdit.Title = movie.Title;
            movieEdit.DirectorName = movie.Title;
            movieEdit.Genre = movie.Genre;            

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }

        // DELETE api/values/5
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Delete(int id)
        {
            // Delete movie from db logic
            //throw new NotImplementedException();


            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return NotFound();

            }
            db.Movies.Remove(movie);
            db.SaveChanges();
            return Ok(movie);

        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }



        private bool MovieExists(int id)
        {
            return db.Movies.Count(e => e.MovieId == id) > 0;
        }

    }
}
