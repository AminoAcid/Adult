using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;
using Adult.Server.Mongo;
using MongoDB.Bson;

namespace Adult.Server.Mongo.MongoHelpers
{
    public static class AutoIncrement
    {
        /*
         * http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/
         */
        public static String getNextSequence(MongoCollection collection, String name = "userid")
        {
            if(collection.Name.Equals("counter") == false)
                throw new MongoException("Must pass in 'counter' collection");

            var query = Query.EQ("ID", name);
            var sort = SortBy.Null;
            var update = Update.Inc("seq", 1);
            //need to delete the tail...save the head. Currently making new documents for each increment.
            collection.Insert(new BsonDocument(){
                {"ID", name},
                {"seq", 1}
            });
            var result = collection.FindAndModify(
                new FindAndModifyArgs()
                {
                    Query = Query.EQ("ID", name),
                    SortBy = SortBy.Null,
                    Update = Update.Inc("seq", 1),
                    Upsert = true,
                });

            if (result.ErrorMessage != null || result.Ok == false)
                throw new MongoException(result.ErrorMessage);

            //gets seq from the response
            return result.Response[0][2].ToString();
        }

       
    }
}
