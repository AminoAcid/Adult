using Adult.Domain.Sql.Request;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Database.SqlPopulate
{
    public class DataContext : DbContext
    {
        public DataContext() : base("NoTabz")
        {
        }
        public DbSet<SqlVideoRequest> SqlVideos { get; set; }
    }
}
