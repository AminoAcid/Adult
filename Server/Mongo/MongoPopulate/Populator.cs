using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Server.Mongo;
using MongoDB.Driver;
using MongoDB.Bson;
using Adult.Server.Mongo.MongoHelpers;

namespace Adult.Server.Mongo.MongoPopulate
{
    public class Populator
    {
        private MongoServers _MongoServer { get { return new MongoServers(); } }
        
        public void populateMongo(String[,] allVideoData)
        {
            for(int i = 0; i < allVideoData.GetLength(0); i++)
            { 
                _MongoServer.videoCollection.Save(
                    new BsonDocument()
                    {
                        {"Id", AutoIncrement.getNextSequence(_MongoServer.counterCollection)},
                        {"Title", allVideoData[i,0]},
                        {"Embed", allVideoData[i,1]}
                    }
                );   
            }
        }
    }
}
