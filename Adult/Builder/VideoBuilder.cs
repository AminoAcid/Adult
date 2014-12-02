using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Adult.Domain.Mongo.Domain.video;
using Adult.Models;
using AutoMapper;

namespace Adult.Builder
{
    public class VideoBuilder
    {
        public VideoViewModel videoViewModelBuilder()
        {
            //use structuremap to solve initalization of createmaps();
            new VideoViewModel();

            var videoModel = Mapper.Map<Video, VideoViewModel>(new Video (){ _id = "1", Name = "hi" });
            return videoModel;
        }
    }
}