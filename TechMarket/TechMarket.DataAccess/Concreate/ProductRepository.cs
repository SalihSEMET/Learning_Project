using TechMarket.Entity;

namespace TechMarket.DataAccess
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(TechMarketDbContext context) : base(context)
        {

        }
    }
}