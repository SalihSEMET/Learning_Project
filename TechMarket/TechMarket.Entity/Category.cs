namespace TechMarket.Entity
{
    public class Category : BaseEntity
    {
        public string CategoryName { get; set; }
        public ICollection<Product> Products { get; set; }
        public Category()
        {
            Products = new HashSet<Product>();
        }
    }
}