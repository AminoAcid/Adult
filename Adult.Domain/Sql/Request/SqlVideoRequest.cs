using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Domain.Mongo.Video;

namespace Adult.Domain.Sql.Request
{
    public class SqlVideoRequest
    {
        [Key]
        public String _id { get; set; }
        public String Embed { get; set; }
        public String Profileimg { get; set; }
        public String Title { get; set; }
        public String GivenId { get; set; }
        public String Sprites { get; set; }
        public String Maintags { get; set; }
        public String Subtags { get; set; }
        public Int32 Views { get; set; }
        public Int32 Pins { get; set; }
    }
}
