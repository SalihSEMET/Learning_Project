using TechMarket.Entity;

namespace TechMarket.DataAccess
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(TechMarketDbContext context) : base(context)
        {

        }
    }
}