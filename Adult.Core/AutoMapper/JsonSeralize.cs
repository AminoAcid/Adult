using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

//using System.Runtime.Serialization;
//using System.IO;
using Adult.Core.JSON;

namespace Adult.Core.AutoMapper
{
    public class JsonSeralize : ValueResolver<String[], String>
    {
        protected override String ResolveCore(String[] source)
        {
            return JsonGenerator.Seralize<String[]>(source);
        }
    }
}
