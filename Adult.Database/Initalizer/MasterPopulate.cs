using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Database.Initalizer
{
    public static class MasterPopulate
    {
        public static void InitMongoPopulates()
        {
            MongoDataPopulate.populateVideos(Extractor.VideoExtract());
            MongoDataPopulate.populateTags(Extractor.CategoryExtract());
        }

        public static void InitSqlPopulates()
        {
            //SqlPopulate extracts from MongoDb
            var sqlpop = new SqlDataPopulate();
            sqlpop.populateSqlVideos();
        }
    }
}
