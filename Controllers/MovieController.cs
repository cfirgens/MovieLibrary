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
        //[ResponseType(typeof(void))]
        public IHttpActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            //throw new NotImplementedException();
            Movie movieEdit = db.Movies.Where(m => m.MovieId == movie.MovieId).FirstOrDefault();

            movieEdit.Title = movie.Title;
            movieEdit.DirectorName = movie.DirectorName;
            movieEdit.Genre = movie.Genre;            

            db.SaveChanges();

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
