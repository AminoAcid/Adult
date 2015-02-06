using Adult.Database.MongoDB;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adult.Database.Initalizer
{
    public static class MongoDataPopulate
    {
        public static void populateTags(DataTable Raw_tagDataTable)
        {
            MongoServers _MongoServer = new MongoServers();
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
     
        public static void populateVideos(DataTable Raw_videoDataTable)
        {
            MongoServers _MongoServer = new MongoServers();
            String[] items, imgs, subtags, maintags;
            for (int i = 0; i < Raw_videoDataTable.Rows.Count; i++)
            {
                //there is only one element in each row, so ItemArray[0]
                items = Raw_videoDataTable.Rows[i].ItemArray[0].ToString().Split('|');
                imgs = items[2].ToString().Split(';');
                subtags = items[4].ToString().Split(';');
                maintags = items[5].ToString().Split(';');
                for (int j = 0; j < maintags.Length; j++)
                {
                    maintags[j] = maintags[j].ToLower();
                }
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
                        {"Subtags", new BsonArray(subtags)},
                        {"Views", 0},
                        {"Pins", 0}
                    }
                );
            }
        }
    }
}
