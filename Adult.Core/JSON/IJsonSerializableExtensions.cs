using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Adult.Core.JSON
{
    public static class IJsonSerializableExtensions
    {
        public static String Serialize(this IJsonSerializable model)
        {
            var settings = new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var jsonResult = JsonConvert.SerializeObject(model, Formatting.None, settings);
            return jsonResult;
        }
    }
}
