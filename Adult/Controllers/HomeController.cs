using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Adult.Server.Mongo;
using Adult.Domain.Mongo.Video;
using Adult.Models;
using Adult.Builder;
using Adult.Core.JSON;
using Microsoft.Web.Mvc;

namespace Adult.Controllers
{
    public class HomeController : Controller
    {
        #region prop
        private ModelBuilder _ModelBuilder
        {
            get { return new ModelBuilder(); }
        }
        private MongoServers _MongoService
        {
            get { return new MongoServers(); }
        }
        #endregion

        [Route("~/")]
        [HttpGet]
        public ActionResult Index()
        {
            Extractor ex = new Extractor();
            Response.Write(ex.giveData());
         //   var model = _ModelBuilder.videoViewModelBuilder();
        //    return View(model.Serialize());
            return View();
        }

        [Route("videos")]
        [AjaxOnly]
        [HttpGet]
        public JsonResult Video()
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