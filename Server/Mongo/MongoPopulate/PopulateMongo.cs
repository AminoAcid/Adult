using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Server.Mongo.MongoPopulate
{
    public class PopulateMongo
    {
        public PopulateMongo()
        {
            //new Populator().populateMongo(new Extractor().getVideoData());
            new Extractor().extractAndPopulate();
        }
    }
}
