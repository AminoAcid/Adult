using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Adult.Core.JSON
{
    public static class JsonGenerator
    {
        public static String Seralize<T>(T obj)
        {
            var settings = new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var jsonResult = JsonConvert.SerializeObject(obj, Formatting.None, settings);
            return jsonResult;
        }

        public static T DeSeralize<T>(String bsonString)
        {
            return JsonConvert.DeserializeObject<T>(bsonString);
        }
    }
}
