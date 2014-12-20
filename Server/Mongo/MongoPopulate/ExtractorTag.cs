using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.Data;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Adult.Domain.Mongo.Video;
using System.Data.OleDb;
using MongoDB.Bson;

namespace Adult.Server.Mongo.MongoPopulate
{
    class ExtractorTag
    {
        private MongoServers _MongoServer { get; set; }
        private DataTable Raw_tagDataTable { get; set; }
        public ExtractorTag()
        {
            _MongoServer = new MongoServers();

            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata2.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
               "SELECT Tags FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "KEY");
            Raw_tagDataTable = videoData.Tables["KEY"];
        }

        public void extractAndPopulate()
        {
            var tagList = new List<String>();
            for(int i = 0; i < Raw_tagDataTable.Rows.Count; i++)
            {
                tagList.Add(Raw_tagDataTable.Rows[i].ItemArray[0].ToString());
            }
            _MongoServer.tagCollection.Save(new BsonDocument()
            {
                {"PopularTags", new BsonArray(tagList.ToArray())}
            });
        }
     }
}
