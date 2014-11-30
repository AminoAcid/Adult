using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Server.Mongo;
using Adult.Domain.Mongo.Domain.video;
using Adult.Models;

namespace Adult.Controllers
{
    [Route("~/")]
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View(new VideoViewModel());
        }
        //add the model stuff to the database here then return sucess or failure as json to angular
        [HttpPost]
        public JsonResult Index()
        {
            MongoServer sev = new MongoServer();
            //sev.videoCollection.Save(new Video(){name = "hi"});
            //Newtonsoft.Json.JsonConvert.SerializeObject(new {foo = "bar"})
            return Json("");
        }
    }
}