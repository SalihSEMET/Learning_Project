using TechMarket.DataAccess;
using TechMarket.Entity;

namespace TechMarket.Business
{
    public class ProductManager : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductManager(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public void Add(Product product)
        {
            _productRepository.Add(product);
        }

        public void Delete(int id)
        {
            var product = _productRepository.Get(x => x.Id == id);
            if (product != null)
            {
                _productRepository.Delete(product);
            }
        }

        public List<Product> GetAll()
        {
            return _productRepository.GetAll().ToList();
        }
        public Product GetById(int id)
        {
            return _productRepository.Get(x => x.Id == id);
        }
        public void Update(Product product)
        {
            _productRepository.Update(product);
        }
    }
}