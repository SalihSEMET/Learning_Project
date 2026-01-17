using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TechMarket.Business.Abstract;
using TechMarket.Business.DTOs;
using TechMarket.Entity.Entities;

namespace TechMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<AppUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var encodedToken = Uri.EscapeDataString(token);

                var link = $"http://localhost:5173/email-verify?userId={user.Id}&token={encodedToken}";

                string body = $"<h3>Welcome {user.FirstName}!</h3>" +
                              $"<p>To complete your registration, please click the link below:</p>" +
                              $"<a href='{link}'>Verify my email address</a>";

                await _emailService.SendEmailAsync(user.Email, "TechMarket - Email Verification", body);

                return Ok(new { message = "User registered successfully! Please check your email to verify account." });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto)
        {
            var user = await _userManager.FindByIdAsync(verifyEmailDto.UserId);
            if (user == null) return BadRequest("Invalid user ID.");

            if (user.EmailConfirmed)
            {
                return Ok(new { message = "Email already verified! You can login." });
            }

            var result = await _userManager.ConfirmEmailAsync(user, verifyEmailDto.Token);

            if (result.Succeeded)
            {
                return Ok(new { message = "Email confirmed successfully! You can now login." });
            }

            return BadRequest("Invalid or expired token.");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // 1. Kullanıcıyı Email ile bul
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // 2. Email onaylı mı kontrol et (Bu çok önemli!)
            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return BadRequest("Please verify your email address first.");
            }

            // 3. Şifreyi kontrol et
            // false: Hatalı girişte kilitleme kapalı (test için)
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result)
            {
                return Unauthorized("Invalid email or password.");
            }

            // 4. (Şimdilik) Token üretmeden sadece "Giriş Başarılı" diyelim
            // Bir sonraki aşamada buraya gerçek JWT Token kodlarını koyacağız.
            return Ok(new
            {
                message = "Login successful!",
                userId = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                // token = GenerateJwtToken(user) // Gelecek adım
            });
        }
    }
}