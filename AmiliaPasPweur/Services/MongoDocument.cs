using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AmiliaPasPweur.Services
{
    [BsonIgnoreExtraElements]
    public abstract class MongoDocument
    {
        [BsonId]
        public ObjectId Id { get; set; }
    }
}