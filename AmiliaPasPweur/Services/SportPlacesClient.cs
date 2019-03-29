//
//using System.Net;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc.RazorPages;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using RestSharp;
//
//namespace AmiliaPasPweur.Api
//{
//    public class SportPlacesClient
//    {
//        private readonly RestClient client;
//
//        public SportPlacesClient()
//        {
//            this.client = new RestClient("https://sportplaces.api.decathlon.com/api/v1");
//        }
//
//        public async Task<Location[]> GetLocations((double x, double y) coordinates, int radius = 100)
//        {
////            https://www.amilia.com/api/v3/fr/locations?
////            type=Radius&coordinates=45.0,-
////            73.5&radius=20&page=1&perpage=250&k
////            eywordId=2
//
//            var request = new RestRequest("locations", Method.GET);
//
//            request.AddQueryParameter("type", "Radius");
//            request.AddQueryParameter("coordinates", $"{coordinates.x}, {coordinates.y}");
//            request.AddQueryParameter("radius", "100");
//
//            var response = await this.client.ExecuteTaskAsync(request);
//
//            if (response.StatusCode == HttpStatusCode.OK)
//            {
//                var items = JObject.Parse(response.Content)["Items"];
//                
//                return JsonConvert.DeserializeObject<Location[]>(items.ToString());
//            }
//            
//            return new Location[0];
//        }
//        
//        public async Task<IRestResponse> GetActivities(int locationId)
//        {
////            https://www.amilia.com/api/v3/fr/locations/{
////            id}/activities?showHidden=false&showCanc
////        elled=false&showChildrenActivities=false&k
////            eywordId=2
//
//            var request = new RestRequest($"locations/{locationId}/activities", Method.GET);
//
//            request.AddQueryParameter("showChildrenActivities", "true");
//
//            return await this.client.ExecuteTaskAsync(request);
//        }
//    }
//
//    public class Keyword
//    {
//        public int Id { get; set; }
//        public string Name { get; set; }
//    }
//
//    public class Address
//    {
//        public double Latitude { get; set; }
//        public double Longitude { get; set; }
//        public string Address1 { get; set; }
//        public string Address2 { get; set; }
//        public string City { get; set; }
//        public string Country { get; set; }
//        public string StateProvince { get; set; }
//        public string ZipPostalCode { get; set; }
//    }
//
//    public class Location
//    {
//        public int Id { get; set; }
//        public string Name { get; set; }
//        public string FullName { get; set; }
//        public string Description { get; set; }
//        public string Telephone { get; set; }
//        public string TelephoneExtension { get; set; }
//        public int? ParentId { get; set; }
//        public int? TopParentId { get; set; }
//        public int?[] AncestorIds { get; set; }
//        public Address Address { get; set; }
//        public Keyword[] Keywords { get; set; }
//    }
//}