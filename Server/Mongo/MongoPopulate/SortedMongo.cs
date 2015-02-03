using Adult.Domain.Mongo.Video;
using Adult.Server.Mongo;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Mongo.MongoPopulate
{
    public class SortedMongo
    {
        private MongoServers _MongoServer { get { return new MongoServers(); } }
        //sorting does not work properly, use command in this
        public void popPinFirst()
        {
            var src = _MongoServer.videoCollection.FindAllAs<Video>().AsQueryable().OrderByDescending(x => x.Pins).ToArray();
            var dest = _MongoServer.pinCollection;
            //var temp = src[0];
            //src[0] = src[src.Length - 1];
            //src[src.Length - 1] = temp;
            foreach(var document in src)
            {
                dest.Save(document);
            }
            //var src = _MongoServer.videoCollection.FindAllAs<Video>().SetSortOrder(SortBy.Descending("Pins"));
            //dest.InsertBatch<Video>(_MongoServer.videoCollection.FindAllAs<Video>().SetSortOrder(SortBy.Descending("Pins")));
            //db.pinFirst.find().sort({Pins:-1})
        }

        public void popViewFirst()
        {
            var src = _MongoServer.videoCollection.FindAllAs<Video>().AsQueryable().OrderByDescending(x => x.Views);
            var dest = _MongoServer.viewCollection;
            foreach (var document in src)
            {
                dest.Save(document);
            }
            //var dest = _MongoServer.viewCollection;
            ////var src = _MongoServer.videoCollection.FindAllAs<Video>().SetSortOrder(SortBy.Descending("Views"));
            //dest.InsertBatch<Video>(_MongoServer.videoCollection.FindAllAs<Video>().SetSortOrder(SortBy.Descending("Views")));
            //db.pinFirst.find().sort({Views:-1})
        }
    }
}
