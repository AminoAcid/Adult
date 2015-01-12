using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Adult.Server.Mongo;
using Adult.Domain.Mongo.Video;
using Adult.ApiControllers.ApiConstants;
using Adult.Core.Constants;

namespace Adult.ApiControllers
{
    [RoutePrefix("api/Video")]
    public class VideoController : ApiController
    {
        private MongoService _MongoService { get { return new MongoService(); } }
        
        [HttpGet]
        [Route("get/{startIndex:int}")]
        public Video[] Get(Int32 startIndex)
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

            return _MongoService.getQueryVideos(keywordString.Split(new char[] { ' ' }), AdultConstants.AMOUNT_RELATED_VID);
        }
        //[HttpGet]
        //[Route("getembed/{BsonIdStrings}")]
        //public String[] GetEmbed([FromUri] String[] BsonIdStrings)
        //{
        //    return _MongoService.getEmbeds(BsonIdStrings);
        //}
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