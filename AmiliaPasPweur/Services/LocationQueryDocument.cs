namespace AmiliaPasPweur.Services
{
    public class LocationQueryDocument : MongoDocument
    {
        public int KeywordId { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}