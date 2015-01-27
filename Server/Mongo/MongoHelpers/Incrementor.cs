using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Server.Mongo;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Bson;

namespace Adult.Mongo.MongoHelpers
{
    public static class Incrementor
    {
        public static void incrementViewCount(String BsonId, MongoCollection collection)
        {

            if (BsonId == null)
                throw new MongoException("Must pass in a BsonId");
            else if (collection == null || collection.Name.Equals("allVideos") == false)
                throw new MongoException("collection must be of 'allVideos'");

            var query = Query.EQ("_id", ObjectId.Parse(BsonId));
            var update = Update.Inc("Views", 1);

            var writeResult = collection.Update(query, update);
        }

        public static void IncrementPinCount(String BsonId, MongoCollection collection)
        {

            if (BsonId == null)
                throw new MongoException("Must pass in a BsonId");
            else if (collection == null || collection.Name.Equals("allVideos") == false)
                throw new MongoException("collection must be of 'allVideos'");

            var query = Query.EQ("_id", ObjectId.Parse(BsonId));
            var update = Update.Inc("Pins", 1);

            var writeResult = collection.Update(query, update);
        }
    }
}
