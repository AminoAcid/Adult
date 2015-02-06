using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Database.Initalizer
{
    public static class Extractor
    {
        public static DataTable VideoExtract()
        {
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
                "SELECT Title FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "KEY");
            return videoData.Tables["KEY"];
        }

        public static DataTable CategoryExtract()
        {
            OleDbConnection connection = new OleDbConnection();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Burton\Desktop\testdata2.xlsx;" + @"Extended Properties=""Excel 12.0 Xml; HDR=YES""";
            OleDbCommand command = new OleDbCommand
            (
               "SELECT Tags FROM [Sheet1$]", connection
            );
            DataSet videoData = new DataSet();
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);
            adapter.Fill(videoData, "KEY");
            return videoData.Tables["KEY"];
        }
    }
}
