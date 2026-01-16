using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace TechMarket.DataAccess
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly TechMarketDbContext _context;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(TechMarketDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public void Add(T t)
        {
            _dbSet.Add(t);
            _context.SaveChanges();
        }

        public void Update(T t)
        {
            _dbSet.Update(t);
            _context.SaveChanges();
        }

        public void Delete(T t)
        {
            _dbSet.Remove(t);
            _context.SaveChanges();
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            if (filter == null)
            {
                return _dbSet.ToList();
            }
            else
            {
                return _dbSet.Where(filter).ToList();
            }
        }

        public T Get(Expression<Func<T, bool>> filter)
        {
            return _dbSet.SingleOrDefault(filter);
        }
    }
}