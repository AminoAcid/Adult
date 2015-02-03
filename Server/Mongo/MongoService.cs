using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Adult.Domain.Mongo.Video;
using Adult.Server.Mongo;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;
using MongoDB.Bson;
using Adult.Core.Constants;
using Adult.Mongo.MongoHelpers;

namespace Adult.Server.Mongo
{
    public class MongoService
    {
        #region properties
        private MongoServers _MongoServer { get { return new MongoServers(); } }
        private Int64 totalVideoCount { get; set; }
        #endregion

        #region constructor
        public MongoService()
        {
            totalVideoCount = _MongoServer.videoCollection.Count();
        }
        #endregion

        #region HTTPGET
        public Video getVideo(String BsonId)
        {
            return _MongoServer.videoCollection.AsQueryable<Video>().Single(x => x._id == BsonId);
        }

        public Video[] getVideos(Int32 amount, Int32 startIndex = 0)
        {
            //if(startIndex <= totalVideoCount && startIndex + amount > totalVideoCount){
            //     amount = (Int32)totalVideoCount - startIndex;
            //}
            //else if (startIndex > totalVideoCount){
            //    return new Video[0];
            //}

            return _MongoServer.videoCollection.AsQueryable<Video>().Skip(startIndex).Take(amount).ToArray();
        }

        public Video[] getMostPinVideos(Int32 amount, Int32 startIndex = 0)
        {
            return _MongoServer.pinCollection.AsQueryable<Video>().Skip(startIndex).Take(amount).ToArray();
        }

        public Video[] getMostViewVideos(Int32 amount, Int32 startIndex = 0)
        {
            return _MongoServer.viewCollection.AsQueryable<Video>().Skip(startIndex).Take(amount).ToArray();
        }

        public Video[] getQueryVideos(String[] keywords, Int32 limitTo = -1)
        {
            if(keywords.Length == 0)
                return new Video[0];
           
            var cursorEnumerator = _MongoServer.videoCollection.FindAllAs<Video>().GetEnumerator();
            var scoreBoard = new Dictionary<String, Int32>();

            while(cursorEnumerator.MoveNext())
            {
                var totalPoints = 0;
                var title = cursorEnumerator.Current.Title.Split(' ');
                var mainTags = cursorEnumerator.Current.Maintags;
                var subTags = cursorEnumerator.Current.Subtags;
                for(int i = 0; i < keywords.Length; i++)
                {
                    if (title.Contains(keywords[i], StringComparer.OrdinalIgnoreCase))
                        totalPoints += 3;
                    if (mainTags.Contains(keywords[i], StringComparer.OrdinalIgnoreCase))
                        totalPoints += 2;
                    if (subTags.Contains(keywords[i], StringComparer.OrdinalIgnoreCase))
                        totalPoints += 1;
                }
                scoreBoard.Add(cursorEnumerator.Current._id, totalPoints);
            }
            var keysToRemove = scoreBoard.Where(x => x.Value == 0).Select(x => x.Key).ToArray();
            foreach (var key in keysToRemove)
            {
                scoreBoard.Remove(key);
            }
            var searchResults = scoreBoard.OrderByDescending(x => x.Value).Select(x => x.Key).ToArray();
            var videos = new Video[searchResults.Length];
            for(int i = 0; i < searchResults.Length; i++)
            {
                videos[i] = _MongoServer.videoCollection.AsQueryable<Video>().Single(x => x._id == searchResults[i]);
            }
            if (limitTo == -1)
                return videos;
            else
                return videos.Take(limitTo).ToArray();
        }

        public Tags getTags()
        {
            return _MongoServer.tagCollection.AsQueryable<Tags>().FirstOrDefault();
        }
        #endregion

        #region HTTPPOST
        public void incrementView(String BsonId)
        {
            Incrementor.incrementViewCount(BsonId, _MongoServer.videoCollection);
        }

        public void incrementPin(String BsonId)
        {
            Incrementor.IncrementPinCount(BsonId, _MongoServer.videoCollection);
        }
        #endregion


    }
}
