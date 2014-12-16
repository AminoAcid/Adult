using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Domain.Mongo.Video
{
    public class Video
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String _id { get; set; }

        public String Embed { get; set; }
        public String Profileimg { get; set; }
        public String Title { get; set; }
        public String GivenId { get; set; }
        public String[] Sprites { get; set; }
        public String[] Maintags { get; set; }
        public String[] Subtags { get; set; }
    }
}
