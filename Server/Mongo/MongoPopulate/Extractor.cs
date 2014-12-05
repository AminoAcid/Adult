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

namespace Adult.Server.Mongo.MongoPopulate
{
    public class Extractor
    {
        private DataTable _videoDataTable { get; set; }
        public Extractor()
        {
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
                "SELECT Title, Embed FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "VIDKEY");
            _videoDataTable = videoData.Tables["VIDKEY"];
        }
        public String[,] getVideoData()
        {
           String[,] allVideoData = new String[_videoDataTable.Rows.Count, _videoDataTable.Columns.Count];
            
           Int32 colIndex = 0;
           for (Int32 rowIndex = 0; rowIndex < _videoDataTable.Rows.Count; rowIndex++ )
           {
               colIndex = 0;
               foreach(var element in _videoDataTable.Rows[rowIndex].ItemArray)
               {
                   allVideoData[rowIndex, colIndex] = _videoDataTable.Rows[rowIndex].ItemArray[colIndex].ToString();
                   colIndex++;
               }
           }
           return allVideoData;
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
