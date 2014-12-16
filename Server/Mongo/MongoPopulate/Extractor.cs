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
    public class Extractor
    {
        private MongoServers _MongoServer { get; set; }
        private DataTable Raw_videoDataTable { get; set; }
        /*
         * This requires 'Microsoft Access Database Engine 2010 Redistributable' to be installed on the machine,
         * then Project->Add New Data Source to this project
         * HardCoded extractor for 2xN excel tables
         */
        public Extractor()
        {
            _MongoServer = new MongoServers();


            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
                "SELECT Title FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "KEY");
            Raw_videoDataTable = videoData.Tables["KEY"];
        }
        public void extractAndPopulate()
        {
            var postDataTable = new DataTable();
            String[] items, imgs, subtags, maintags;
            for (int i = 0; i < Raw_videoDataTable.Rows.Count; i++)
            {
                items = Raw_videoDataTable.Rows[i].ItemArray[0].ToString().Split('|');
                imgs = items[2].ToString().Split(';');
                subtags = items[4].ToString().Split(';');
                maintags = items[5].ToString().Split(';');
                items[2] = null; //imgs
                items[4] = null; //subtags
                items[5] = null; //maintags
                items[6] = null; //empty space
                items = items.Where(x => x != null).ToArray();

                _MongoServer.videoCollection.Save(
                    new BsonDocument()
                    {
                        {"Embed", items[0]},
                        {"Profileimg", items[1]},
                        {"Title", items[2]},
                        {"GivenId", items[3]},
                        {"Sprites", new BsonArray(imgs)},
                        {"Maintags", new BsonArray(maintags)},
                        {"Subtags", new BsonArray(subtags)}

                    }
                );
            }
        }
            //public String[,] getVideoData()
            //{
            //   String[,] allVideoData = new String[_videoDataTable.Rows.Count, _videoDataTable.Columns.Count];

            //   Int32 colIndex = 0;
            //   for (Int32 rowIndex = 0; rowIndex < _videoDataTable.Rows.Count; rowIndex++ )
            //   {
            //       colIndex = 0;
            //       foreach(var element in _videoDataTable.Rows[rowIndex].ItemArray)
            //       {
            //           allVideoData[rowIndex, colIndex] = _videoDataTable.Rows[rowIndex].ItemArray[colIndex].ToString();
            //           colIndex++;
            //       }
            //   }
            //   return allVideoData;
            //}
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
