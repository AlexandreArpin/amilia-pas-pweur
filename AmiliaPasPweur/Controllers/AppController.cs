using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmiliaPasPweur.Api;
using Microsoft.AspNetCore.Mvc;

namespace AmiliaPasPweur.Controllers
{
    [Route("api")]
    public class AppController : Controller
    {
        private readonly AmiliaClient amiliaClient;

        public AppController()
        {
            this.amiliaClient = new AmiliaClient();
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

            return this.Ok(filtered);
        }
    }
}