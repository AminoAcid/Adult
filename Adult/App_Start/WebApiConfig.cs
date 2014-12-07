using System.Linq;
using System.Web.Http;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Serialization;

namespace Adult.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Formatters.OfType<JsonMediaTypeFormatter>().First().SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.MapHttpAttributeRoutes();
            // Web API routes

            /*
                    ATLERNATIVE for [Route] Attribute
                   
                    config.Routes.MapHttpRoute(
                    name: "ApiByName",
                    routeTemplate: "api/{controller}/{action}/{startIndex}",
                    defaults: new { startIndex = RouteParameter.Optional }
                    );
             */

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { action = "Get" }
            );
        }
    }
}