namespace AmiliaPasPweur.Services
{
    public class NotifyMeDocument : MongoDocument
    {
        public int KeywordId { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public string Email { get; set; }
    }
}