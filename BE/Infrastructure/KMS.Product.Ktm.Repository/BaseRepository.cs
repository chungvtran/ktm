﻿using KMS.Product.Ktm.Entities.Models;
using KMS.Product.Ktm.Services.RepoInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace KMS.Product.Ktm.Repository
{
    /// <summary>
    /// An base repository using asynchronous operations for other repositories to inherit
    /// </summary>
    /// <typeparam name="T">BaseEntity</typeparam>
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly KtmDbContext context;
        private readonly DbSet<T> entities;
        private readonly ILogger<T> _logger;

        public BaseRepository(KtmDbContext context, ILogger<T> logger)
        {
            this.context = context;
            entities = context.Set<T>();
            _logger = logger;
        }

        /// <summary>
        /// Get all the entities
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> GetAll()
        {
            return entities.AsQueryable().AsNoTracking();
        }


        /// <summary>
        /// Get all the entities with a condition
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression)
        {
            return entities.Where(expression).AsQueryable().AsNoTracking();
        }

        /// <summary>
        /// Get entity by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>An entity by id</returns>
        public async Task<T> GetByIdAsync(int id)
        {
            return await entities.FirstOrDefaultAsync(s => s.Id == id);
        }

        /// <summary>
        /// Add new entity to database
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="saveChange"></param>
        /// <returns></returns>
        public async Task InsertAsync(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            entity.Created = DateTime.Now;
            entity.Modified = DateTime.Now;

            entities.Add(entity);

            if (saveChange)
            {
                await context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Update an existing entity
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="saveChange"></param>
        /// <returns></returns>
        public async Task UpdateAsync(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entity.Modified = DateTime.Now;
            //_logger.LogInformation($"{context.Entry(entity).State}");
            //context.Entry(entity).State = EntityState.Detached;
            context.Entry(entity).Property(e => e.Created).IsModified = false;
            entities.Update(entity);
            //context.Entry(entity).State = EntityState.Modified;
            if (saveChange)
                await context.SaveChangesAsync();
        }

        /// <summary>
        /// Delete an existing entity
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="saveChange"></param>
        /// <returns></returns>
        public async Task DeleteAsync(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            if (saveChange)
                await context.SaveChangesAsync();
        }
    }
}
