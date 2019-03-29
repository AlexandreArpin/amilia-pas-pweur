using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmiliaPasPweur.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace AmiliaPasPweur.Controllers
{
    [Route("api")]
    public class AppController : Controller
    {
        private readonly AmiliaClient amiliaClient;
        private readonly MongoRepository mongoRepo;

        public AppController()
        {
            this.amiliaClient = new AmiliaClient();
            this.mongoRepo = new MongoRepository();
        }
        
        [HttpGet("keywords")]
        public async Task<IActionResult> Keywords()
        {
            return this.Ok(await amiliaClient.GetKeywords());
        }
        
        [HttpGet("locations")]
        public async Task<IActionResult> Locations([FromQuery]int keywordId, [FromQuery]double lat, [FromQuery]double lng)
        {
//            var mtl = (45, -73.5);

            var coords = (lat, lng);
            var locations = await amiliaClient.GetLocations(coords, keywordId: keywordId);
            var filtered = locations.Where(x => x.Keywords.Any(y => y.Id == keywordId));
            
            await this.mongoRepo.InsertOneAsync(new LocationQueryDocument
            {
                KeywordId = keywordId,
                Latitude = lat,
                Longitude = lng
            
            });
            
            return this.Ok(filtered);
        }
        
        [HttpPost("notify-me")]
        public async Task<IActionResult> NotifyMe([FromBody]NotifyMeDto notifyMe)
        {
            await this.mongoRepo.InsertOneAsync(new NotifyMeDocument
            {
                KeywordId = notifyMe.KeywordId,
                Latitude = notifyMe.Lat,
                Longitude = notifyMe.Lng,
                Email = notifyMe.Email,
            });
     
            return this.Ok();
        }
        
        [HttpGet("admin")]
        public async Task<IActionResult> LocationQueries()
            {
                var docs = await this.mongoRepo.FindAllAsync<LocationQueryDocument>();
     
                return this.Ok(docs);
            }
        }

    public class NotifyMeDto
    {
        public int KeywordId { get; set; }

        public double Lng { get; set; }

        public double Lat { get; set; }

        public string Email { get; set; }
    }
}