using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Adult.Server.Mongo;
using Adult.Domain.Mongo.Video;

namespace Adult.ApiControllers
{
    public class VideoController : ApiController
    {
        private MongoService _MongoService { get { return new MongoService(); } }
        // GET api/<controller>
        public Video Get()
        {
            return _MongoService.getVideo("548141037f807d35c41c95b2");
           // return _MongoService.getVideos(3);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}