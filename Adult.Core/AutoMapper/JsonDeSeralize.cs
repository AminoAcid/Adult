using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adult.Core.JSON;
using AutoMapper;

namespace Adult.Core.AutoMapper
{
    public class JsonDeSeralize : ValueResolver<String, String[]>
    {
        protected override String[] ResolveCore(String source)
        {
            return JsonGenerator.DeSeralize<String[]>(source);
        }
    }
}
