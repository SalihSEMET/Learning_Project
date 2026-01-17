using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TechMarket.Entity.Entities;
using TechMarket.Business;
using TechMarket.DataAccess;
using TechMarket.Business.Abstract;
using TechMarket.Business.Concrete;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//Services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        b => b.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});
builder.Services.AddDbContext<TechMarketDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 3;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<TechMarketDbContext>()
.AddDefaultTokenProviders();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductService, ProductManager>();
builder.Services.AddScoped<ICategoryService, CategoryManager>();
builder.Services.AddScoped<IEmailService, SmtpEmailService>();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();

app.MapControllers();

app.Run();