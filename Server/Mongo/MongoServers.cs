using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Domain.Mongo.Video;



namespace Adult.Server.Mongo
{
    public class MongoServers
    {
        private MongoDatabase mongoDB { get; set; }
        public MongoCollection videoCollection { get; set; }
        protected MongoCollection counterCollection { get; set; }
        public MongoServers()
        {
            /*If you wanted to set the server address
             * MongoClientSettings settings = new MongoClientSettings();
             * settings.Server = new MongoServerAddress("localhost, 27017);
             * MongoClient client = new MongoClient(settings);
             */
            this.mongoDB = new MongoClient().GetServer().GetDatabase("Adult");
            this.videoCollection = mongoDB.GetCollection<Video>("videos");
            this.counterCollection = mongoDB.GetCollection("counter");
        }
    
        
    }
}
