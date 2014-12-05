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

namespace Adult.Server.Mongo
{
    public class Extractor
    {
        private DataTable _datastuff { get; set; }
        public Extractor()
        {
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
                "SELECT testdata FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "videos");
            _datastuff = videoData.Tables["videos"];
        }
        public String giveData()
        {
            return _datastuff.Rows[0]["testdata"].ToString();
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
