using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Adult.Server.Mongo;
using Adult.Domain.Mongo.Video;
using Adult.Core.Constants;
using Adult.Core.Constants;
using MongoDB.Bson;

namespace Adult.ApiControllers
{
    [RoutePrefix("api/Video")]
    public class VideoController : ApiController
    {
        private MongoService _MongoService { get { return new MongoService(); } }
        
        [HttpGet]
        [Route("getunique/{bsonId}")]
        public Video GetUnique(String bsonId)
        {
            return _MongoService.getVideo(bsonId);
        }

        [HttpGet]
        [Route("mostpinvideos/{startIndex:int}")]
        public Video[] MostPinVideos(Int32 startIndex)
        {
            return _MongoService.getMostPinVideos(VideoConstants.AMOUNT_PER_LOAD, startIndex);
        }

        [HttpGet]
        [Route("mostviewvideos/{startIndex:int}")]
        public Video[] MostViewVideos(Int32 startIndex)
        {
            return _MongoService.getMostViewVideos(VideoConstants.AMOUNT_PER_LOAD, startIndex);
        }

        [HttpGet]
        [Route("getvideos/{startIndex:int}")]
        public Video[] GetVideos(Int32 startIndex)
        {
            return _MongoService.getVideos(VideoConstants.AMOUNT_PER_LOAD, startIndex);
        }
        
        [HttpGet]
        [Route("queryget/{keywordString}")]
        public Video[] QueryGet(String keywordString)
        {
            return _MongoService.getQueryVideos(keywordString.Split(new char[]{' '}));
        }

        [HttpGet]
        [Route("relatedget/{keywordString}")]
        public Video[] RelatedGet(String keywordString)
        {

            return _MongoService.getQueryVideos(keywordString.Split(new char[] { ' ' }), VideoConstants.AMOUNT_RELATED_VID);
        }
        
        [HttpPost]
        [Route("incrementview/{BsonId}")]
        public void IncrementView(String BsonId)
        {
            _MongoService.incrementView(BsonId);
        }

        [HttpPost]
        [Route("incrementpin/{BsonId}")]
        public void IncrementPin(String BsonId)
        {
            _MongoService.incrementPin(BsonId);
        }
        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}