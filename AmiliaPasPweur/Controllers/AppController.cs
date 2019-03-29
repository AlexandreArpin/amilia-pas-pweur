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
        
        [HttpGet("admin")]
        public async Task<IActionResult> LocationQueries()
            {
                var queries = await this.mongoRepo.FindAllAsync<LocationQueryDocument>();
     
                return this.Ok(new
                {
                    queries = queries.Select(x =>
                    new {
                        sport = x.KeywordId,
                        location = new
                        {
                            lng = x.Longitude,
                            lat = x.Latitude
                        },
                        count = 0
                    }),
                    notifications = queries.Select(x =>
                        new {
                            sport = x.KeywordId,
                            location = new
                            {
                                lng = x.Longitude,
                                lat = x.Latitude
                            },
                            count = 0
                        }),
                });
            }
        }
}