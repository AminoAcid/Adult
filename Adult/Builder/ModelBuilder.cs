using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Adult.Domain.Mongo.Video;
using Adult.Models;
using AutoMapper;
using Adult.Server.Mongo;

namespace Adult.Builder
{
    public class ModelBuilder
    {
        private MongoService _MongoService { get { return new MongoService(); } }
        public VideoViewModel videoViewModelBuilder()
        {
            //use structuremap to solve initalization of createmaps();
            new VideoViewModel();

            var videoModel = Mapper.Map<Tags, VideoViewModel>(_MongoService.getTags());
            
            return videoModel;
        }
    }
}