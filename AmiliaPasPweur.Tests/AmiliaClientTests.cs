using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AmiliaPasPweur.Api;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Xunit;

namespace AmiliaPasPweur.Tests
{
    public class AmiliaClientTests
    {
        private readonly AmiliaClient client;

        public AmiliaClientTests()
        {
            this.client = new AmiliaClient();
        }

        [Fact]
        public async Task GetLocations()
        {
            // Arrange
            var mtl = (45, -73.5);
            
            // Act
            var locations = await this.client.GetLocations(mtl);
            
            // Assert
            Assert.NotEmpty(locations);
        }
        
        [Fact]
        public async Task GetKeywords()
        {
            // Arrange
            // Act
            var keywords = await this.client.GetKeywords();
            
            // Assert
            Assert.NotEmpty(keywords);
        }
        
        [Fact]
        public async Task GetActivities()
        {
            // Arrange
            var mtl = (45, -73.5);
            var locations = await this.client.GetLocations(mtl);

            // Act
            var activities = await this.client.GetActivities(locations.First().Id);
            
            // Assert
            Assert.Equal(HttpStatusCode.OK, activities.StatusCode);
        }
    }
}
