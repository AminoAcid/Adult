using Adult.Database.SqlPopulate;
using Adult.Domain.Sql.Request;
using Adult.Domain.Sql.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Adult.Core.AutoMapper;

namespace Adult.Sql
{
    public class SqlService
    {
        public SqlService()
        {
            Maps.createResponseMaps();
        }
        #region HTPPGET
        public SqlVideoResponse[] getMostPinVideos(Int32 amount, Int32 startIndex = 0)
        {
            using(DataContext db = new DataContext())
            {
                var mongoVideoArr = db.SqlVideos.OrderByDescending(x => x.Pins).Skip(startIndex).Take(amount).ToArray();
                var SqlVideoResponseArr = new SqlVideoResponse[mongoVideoArr.Length];
                for (int i = 0; i < mongoVideoArr.Length; i++)
                {
                    SqlVideoResponseArr[i] = Mapper.Map<SqlVideoRequest, SqlVideoResponse>(mongoVideoArr[i]);
                }
                return SqlVideoResponseArr;
            }
        }

        public SqlVideoResponse[] getMostViewVideos(Int32 amount, Int32 startIndex = 0)
        {
            using (DataContext db = new DataContext())
            {
                var mongoVideoArr = db.SqlVideos.OrderByDescending(x => x.Views).Skip(startIndex).Take(amount).ToArray();
                var SqlVideoResponseArr = new SqlVideoResponse[mongoVideoArr.Length];
                for (int i = 0; i < mongoVideoArr.Length; i++)
                {
                    SqlVideoResponseArr[i] = Mapper.Map<SqlVideoRequest, SqlVideoResponse>(mongoVideoArr[i]);
                }
                return SqlVideoResponseArr;
            }
        }
        #endregion

    }
}
