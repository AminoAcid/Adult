using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Adult.Domain.Mongo.Video;
using Adult.Domain.Sql.Request;
using Adult.Domain.Sql.Response;

namespace Adult.Core.AutoMapper
{
    public static class Maps
    {
        public static void createRequestMaps()
        {
            Mapper.CreateMap<MongoVideo, SqlVideoRequest>()
                .ForMember(dest => dest._id, opt => opt.MapFrom(src => src._id))
                .ForMember(dest => dest.Embed, opt => opt.MapFrom(src => src.Embed))
                .ForMember(dest => dest.Profileimg, opt => opt.MapFrom(src => src.Profileimg))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.GivenId, opt => opt.MapFrom(src => src.GivenId))
                .ForMember(dest => dest.Sprites, opt => opt.ResolveUsing<JsonSeralize>().FromMember(src => src.Sprites))
                .ForMember(dest => dest.Maintags, opt => opt.ResolveUsing<JsonSeralize>().FromMember(src => src.Maintags))
                .ForMember(dest => dest.Subtags, opt => opt.ResolveUsing<JsonSeralize>().FromMember(src => src.Subtags))
                .ForMember(dest => dest.Views, opt => opt.MapFrom(src => src.Views))
                .ForMember(dest => dest.Pins, opt => opt.MapFrom(src => src.Pins));
        }
        public static void createResponseMaps(){

            Mapper.CreateMap<SqlVideoRequest, SqlVideoResponse>()
                .ForMember(dest => dest._id, opt => opt.MapFrom(src => src._id))
                .ForMember(dest => dest.Embed, opt => opt.MapFrom(src => src.Embed))
                .ForMember(dest => dest.Profileimg, opt => opt.MapFrom(src => src.Profileimg))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.GivenId, opt => opt.MapFrom(src => src.GivenId))
                .ForMember(dest => dest.Sprites, opt => opt.ResolveUsing<JsonDeSeralize>().FromMember(src => src.Sprites))
                .ForMember(dest => dest.Maintags, opt => opt.ResolveUsing<JsonDeSeralize>().FromMember(src => src.Maintags))
                .ForMember(dest => dest.Subtags, opt => opt.ResolveUsing<JsonDeSeralize>().FromMember(src => src.Subtags))
                .ForMember(dest => dest.Views, opt => opt.MapFrom(src => src.Views))
                .ForMember(dest => dest.Pins, opt => opt.MapFrom(src => src.Pins));
        }
    }
}
