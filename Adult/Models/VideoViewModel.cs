using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Adult.Domain.Mongo.Video;
using Newtonsoft.Json;
using Adult.Core.JSON;

namespace Adult.Models
{
    public class VideoViewModel : IJsonSerializable
    {
        public String[] Tags { get; set; }

        public VideoViewModel()
        {
            createMaps();
        }
        public void createMaps()
        {
            Mapper.CreateMap<Tags, VideoViewModel>()
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.PopularTags)
                );
            
        }
    }

}