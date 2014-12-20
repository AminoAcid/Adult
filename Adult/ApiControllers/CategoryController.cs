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
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        private MongoService _MongoService { get { return new MongoService(); } }
        [HttpGet]
        [Route("get")]
        public Tags Get()
        {
            return _MongoService.getTags();
        }
    }
}