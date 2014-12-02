using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Server.Mongo;
using Adult.Domain.Mongo.Domain.video;
using Adult.Models;
using Adult.Builder;
using Adult.Core.JSON;

namespace Adult.Controllers
{
    public class HomeController : Controller
    {
        private ModelBuilder _ModelBuilder
        {
            get { return new ModelBuilder(); }
        }
        [Route("~/")]
        [HttpGet]
        public ActionResult Index()
        {
            var model = _ModelBuilder.videoViewModelBuilder();
            return View("Index", "", model.Serialize());
        }
        [HttpGet]
        public ActionResult Video(VideoViewModel model)
        {
            return Json(_ModelBuilder.videoViewModelBuilder(), JsonRequestBehavior.DenyGet);
        }
        //add the model stuff to the database here then return sucess or failure as json to angular
        //[HttpPost]
        //public JsonResult Index()
        //{
        //    MongoServer sev = new MongoServer();
        //    //sev.videoCollection.Save(new Video(){name = "hi"});
        //    //Newtonsoft.Json.JsonConvert.SerializeObject(new {foo = "bar"})
        //    return Json("");
        //}
    }
}