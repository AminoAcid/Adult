using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using System.Runtime.Serialization;
using Adult.Domain.Sql;

namespace Adult.Domain.Mongo.Video
{
    //[DataContract]
    public class MongoVideo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String _id { get; set; }
        public String Embed { get; set; }
        public String Profileimg { get; set; }
        public String Title { get; set; }
        public String GivenId { get; set; }
        //[DataMember]
        public String[] Sprites { get; set; }
        //[DataMember]
        public String[] Maintags { get; set; }
        //[DataMember]
        public String[] Subtags { get; set; }
        public Int32 Views { get; set; }
        public Int32 Pins { get; set; }
    }
}
