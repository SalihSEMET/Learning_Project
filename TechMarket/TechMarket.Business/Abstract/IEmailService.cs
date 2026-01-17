using System.Threading.Tasks;

namespace TechMarket.Business.Abstract
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string message);
    }
}