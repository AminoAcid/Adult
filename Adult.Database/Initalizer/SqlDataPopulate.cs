using Adult.Database.SqlPopulate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Database.MongoDB;
using Adult.Domain.Mongo.Video;
using MongoDB.Driver.Builders;
using AutoMapper;
using Adult.Domain.Sql.Request;
using Newtonsoft.Json;
using Adult.Core.AutoMapper;

namespace Adult.Database.Initalizer
{
    public class SqlDataPopulate
    {
        public SqlDataPopulate()
        {
            Maps.createRequestMaps();
        }
        public void populateSqlVideos()
        {
            MongoServers _MongoServer = new MongoServers();
            var cursorEnumerator = _MongoServer.videoCollection.FindAllAs<MongoVideo>().GetEnumerator();
            using(DataContext db = new DataContext())
            {
                while(cursorEnumerator.MoveNext())
                {
                    db.SqlVideos.Add(Mapper.Map<MongoVideo, SqlVideoRequest>(cursorEnumerator.Current));
                }
                db.SaveChanges();
            }
        }
    }
}
