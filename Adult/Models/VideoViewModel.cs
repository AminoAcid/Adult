using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Adult.Domain.Mongo.Domain.video;
using Newtonsoft.Json;
using Adult.Core.JSON;

namespace Adult.Models
{
    public class VideoViewModel : IJsonSerializable
    {
        public String _id { get; set; }
        public String Name { get; set; }
        public VideoViewModel()
        {
            createMaps();
        }
        public void createMaps()
        {
            Mapper.CreateMap<Video, VideoViewModel>()
                .ForMember(dest => dest._id, opt => opt.MapFrom(src => src._id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name)
            );
        }
    }

}