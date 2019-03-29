using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace AmiliaPasPweur.Services
{
    public sealed class MongoRepository
    {
        private const string DOCUMENTSUFFIX = "document";
        private readonly IMongoDatabase _database;

        public MongoRepository()
        {
            var mongoClient = new MongoClient("mongodb+srv://appUser:6oD2f2XJryPECIuW@cluster0-rvtcr.azure.mongodb.net/app?retryWrites=true");
            this._database = mongoClient.GetDatabase("app");
        }
        
        public Task InsertOneAsync<TDocument>(TDocument document)
        {
            return this.Collection<TDocument>().InsertOneAsync(document);
        }

        public async Task<IReadOnlyList<TDocument>> FindAllAsync<TDocument>()
        {
            var result = new List<TDocument>();

            using (var cursor = await this.Collection<TDocument>().FindAsync(_ => true))
            {
                while (await cursor.MoveNextAsync())
                {
                    result.AddRange(cursor.Current);
                }
            }

            return result;
        }

        public async Task<(OperationResult Result, TDocument Document)> FindOneAsync<TDocument>(FilterDefinition<TDocument> filter)
            where TDocument : class
        {
            var matches = (await this.FindAsync(filter, new FindOptions<TDocument> { Limit = 2 })).ToList();

            if (matches.Count > 1)
            {
                return (OperationResult.Failure(ErrorCodes.MultipleMatchesFound), (TDocument)null);
            }
            
            if (matches.Count == 0)
            {
                return (OperationResult.Failure(ErrorCodes.NoMatchFound), (TDocument)null);
            }

            return (OperationResult.Success, matches.First());
        }
        
        public async Task<IEnumerable<TDocument>> FindAsync<TDocument>(FilterDefinition<TDocument> filter, FindOptions<TDocument, TDocument> options = null)
        {
            var result = new List<TDocument>();
            
            if (options == null)
            {
                using (var cursor = await this.Collection<TDocument>().FindAsync(filter))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        result.AddRange(cursor.Current);
                    }
                }
            }
            else
            {
                using (var cursor = await this.Collection<TDocument>().FindAsync(filter, options))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        result.AddRange(cursor.Current);
                    }
                }
            }

            return result;
        }

        public async Task<bool> AnyAsync<TDocument>(FilterDefinition<TDocument> filter)
        {
            return await this.Collection<TDocument>().Find(filter).AnyAsync();
        }

        public async Task<bool> AllAsync<TDocument>(FilterDefinition<TDocument> filter, FilterDefinition<TDocument> predicate)
        {
            var allFilter = filter & Builders<TDocument>.Filter.Not(predicate);
            var hasAny = await this.AnyAsync(allFilter);

            return !hasAny;
        }

        public async Task<(OperationResult, TDocument)> UpsertOneAsync<TDocument>(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> updateDefinition) 
            where TDocument : class
        {
            var matches = (await this.FindAsync(filter, new FindOptions<TDocument> { Limit = 2 })).ToList();
            if (matches.Count > 1)
            {
                return (OperationResult.Failure(ErrorCodes.MultipleMatchesFound), (TDocument)null);
            }

            var document = await this.Collection<TDocument>().FindOneAndUpdateAsync(filter, updateDefinition, new FindOneAndUpdateOptions<TDocument> { IsUpsert = true });

            return (OperationResult.Success, document);
        }
        
        public async Task<(OperationResult, TDocument)> UpdateOneAsync<TDocument>(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> updateDefinition)  
            where TDocument : class
        {
            var matches = (await this.FindAsync(filter, new FindOptions<TDocument> { Limit = 2 })).ToList();
            if (matches.Count == 0)
            {
                return (OperationResult.Failure(ErrorCodes.NoMatchFound), (TDocument)null);
            }
            
            if (matches.Count > 1)
            {
                return (OperationResult.Failure(ErrorCodes.MultipleMatchesFound), (TDocument)null);
            }

            var document = await this.Collection<TDocument>().FindOneAndUpdateAsync(filter, updateDefinition);

            return (OperationResult.Success, document);
        }
        
        public Task UpdateManyAsync<TDocument>(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> updateDefinition)  
            where TDocument : class
        {
            return this.Collection<TDocument>().UpdateManyAsync(filter, updateDefinition);
        }

        public Task DeleteManyAsync<TDocument>(FilterDefinition<TDocument> filter)
        {
            return this.Collection<TDocument>().DeleteManyAsync(filter);
        }

        public async Task<OperationResult> DeleteOneAsync<TDocument>(FilterDefinition<TDocument> filter)
        {
            var matches = (await this.FindAsync(filter, new FindOptions<TDocument> { Limit = 2 })).ToList();
            if (matches.Count > 1)
            {
                return OperationResult.Failure(MongoRepository.ErrorCodes.MultipleMatchesFound);
            }

            await this.Collection<TDocument>().DeleteOneAsync(filter);

            return OperationResult.Success;
        }
        
        // TODO: Tests
        public Task<long> CountAsync<TDocument>(FilterDefinition<TDocument> filter)
        {
            return this.Collection<TDocument>().CountDocumentsAsync(filter);
        }

        // TODO: Tests
        public async Task<List<TDocument>> DistinctAsync<TDocument>(FilterDefinition<TDocument> filter, string fieldName)
        {
            var results = new List<TDocument>();

            using (var cursor = await this.Collection<TDocument>().DistinctAsync<TDocument>(fieldName, filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    results.AddRange(cursor.Current);
                }
            }

            return results;
        }

        public Task UpsertManyAsync<TDocument>(IReadOnlyList<(FilterDefinition<TDocument> Filter, UpdateDefinition<TDocument> Update)> upserts)
        {
            if (!upserts.Any())
            {
                return Task.CompletedTask;
            }

            var upsertModels = upserts.Select(x => new UpdateOneModel<TDocument>(x.Filter, x.Update) { IsUpsert = true });

            return this.Collection<TDocument>().BulkWriteAsync(upsertModels);
        }

        public Task CreateIndexAsync<TDocument>(CreateIndexModel<TDocument> index, CreateOneIndexOptions options = null)
        {
            return this.Collection<TDocument>().Indexes.CreateOneAsync(index, options);
        }

        public IMongoCollection<TDocument> Collection<TDocument>() => this._database.GetCollection<TDocument>(this.GetDocumentCollectionName<TDocument>());

        internal string GetDocumentCollectionName<TDocument>()
        {
            var name = typeof(TDocument).Name;
            if (name.EndsWith(DOCUMENTSUFFIX, StringComparison.OrdinalIgnoreCase))
            {
                return name.Substring(0, name.Length - DOCUMENTSUFFIX.Length);
            }
            else
            {
                return name;
            }
        }

        public static class ErrorCodes
        {
            public const string MultipleMatchesFound = nameof(MultipleMatchesFound);
            public const string NoMatchFound = nameof(NoMatchFound);
        }
        
        public class OperationResult
        {
            private OperationResult(bool isSuccess, string errorCode, Exception exception = null)
            {
                this.IsSuccess = isSuccess;
                this.ErrorCode = errorCode;
                this.Exception = exception;
            }

            public static OperationResult Success { get; } = new OperationResult(true, null);
        
            public bool IsSuccess { get; }

            public string ErrorCode { get; }

            public Exception Exception { get; }
        
            public static OperationResult Failure(string errorCode) => new OperationResult(false, errorCode);

            public static OperationResult Failure(string errorCode, Exception exception) => new OperationResult(false, errorCode, exception);
        }
    }
}