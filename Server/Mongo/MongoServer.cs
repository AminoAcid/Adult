using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Domain.Mongo.Domain.video;

namespace Server.Mongo
{
    public class MongoServer
    {
        private MongoDatabase mongoDB { get; set; }
        public MongoCollection videoCollection { get; set; }
        public MongoServer()
        {
            /*If you wanted to set the server address
             * MongoClientSettings settings = new MongoClientSettings();
             * settings.Server = new MongoServerAddress("localhost, 27017);
             * MongoClient client = new MongoClient(settings);
             */
            this.mongoDB = new MongoClient().GetServer().GetDatabase("Adult");
            this.videoCollection = mongoDB.GetCollection<Video>("videos");
        }
        /*
         * getting from excel
         * =================
         * String filename = @"c:/temp/...../file.csv";
         * var entire = File.ReadLines(filename).Take(n);
         * return entire.Select(x => x.Split(';'); : IEnumberable<String[]>
         * foreach(var item in ienumberable)
         *      video vid = new Video();
         *      vid.name = item[0].Replace("|","");
         *      videoCollection.Save(vid);
         *      
         * must use collection.AsQueryable().linqexpression
         * 
         * 
         */ 
    }
}
