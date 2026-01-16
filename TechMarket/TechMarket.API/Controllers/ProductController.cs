using Microsoft.AspNetCore.Mvc;
using TechMarket.Business;
using TechMarket.Entity;

namespace TechMarket.API.Controllers
{
    [Route("Api/Product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _productService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _productService.GetById(id);
            if (result == null)
            {
                return NotFound("No such product was found.");
            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(Product product)
        {
            _productService.Add(product);
            return Ok("Product Successfully Added");
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _productService.GetById(id);
            if (result == null)
            {
                return NotFound("Product not found.");
            }
            else
            {
                _productService.Delete(id);
                return Ok("Product Successfully Deleted");
            }
        }
    }
}