using System.Linq.Expressions;

namespace TechMarket.DataAccess
{
    public interface IGenericRepository<T> where T : class
    {
        void Add(T t);
        void Update(T t);
        void Delete(T t);
        List<T> GetAll(Expression<Func<T, bool>> filter = null);
        T Get(Expression<Func<T, bool>> filter);
    }
}