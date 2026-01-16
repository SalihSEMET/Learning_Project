using TechMarket.DataAccess;
using TechMarket.Entity;

namespace TechMarket.Business
{
    public class CategoryManager : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryManager(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public void Add(Category category)
        {
            _categoryRepository.Add(category);
        }

        public void Delete(int id)
        {
            var result = _categoryRepository.Get(x => x.Id == id);
            if (result != null)
            {
                _categoryRepository.Delete(result);
            }
        }

        public List<Category> GetAll()
        {
            return _categoryRepository.GetAll().ToList();
        }

        public Category GetById(int id)
        {
            return _categoryRepository.Get(x => x.Id == id);
        }

        public void Update(Category category)
        {
            _categoryRepository.Update(category);
        }
    }
}