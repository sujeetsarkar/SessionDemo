using SessionMiddleware;

namespace SessionDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDistributedMemoryCache();
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(20);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            var myAllowSpecificOrigin = "_myAllowSpecificOrigin";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(myAllowSpecificOrigin, policy =>
                {
                    policy.WithOrigins("http://localhost:4200",
                        "http://localhost:5297")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<SessionExtMiddle>();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(myAllowSpecificOrigin);
            app.UseSession();
            app.MapControllers();
            app.Run();
        }
    }
}