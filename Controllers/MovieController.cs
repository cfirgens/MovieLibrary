using MovieLibrary.Models;
using System;
using System.Collections.Generic;
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
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Post([FromBody]Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Movies.Add(movie);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = movie.MovieId }, movie);

            // Create movie in db logic
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
            throw new NotImplementedException();
        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            // Delete movie from db logic
            throw new NotImplementedException();
        }
    }
}
