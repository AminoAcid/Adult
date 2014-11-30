using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Adult.Domain.Mongo.Domain.video;
using Newtonsoft.Json;

namespace Adult.Models
{
    public class VideoViewModel
    {
        public String _id { get; set; }
        public String name { get; set; }

        public void createMaps()
        {
            Mapper.CreateMap<VideoViewModel, Video>()
                .ForMember(dest => dest._id, opt => opt.MapFrom(src => src._id))
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.name)
            );
        }
    }

}