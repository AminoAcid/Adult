﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;
using Adult.Server.Mongo;
using MongoDB.Bson;

namespace Server.Mongo.MongoHelpers
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
            return collection.FindAndModify(query, sort, update, true, true).ToString();    
            
        }

       
    }
}