using Microsoft.AspNetCore.Mvc;
using TechMarket.Business;
using TechMarket.Entity;
namespace TechMarket.API
{
    [Route("Api/Category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _categoryService.GetAll();
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(Category category)
        {
            _categoryService.Add(category);
            return Ok("Category Successfully Added");
        }

    }
}