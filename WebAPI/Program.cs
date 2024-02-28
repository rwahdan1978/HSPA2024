using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Middlewares;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);
var builder2 = new SqlConnectionStringBuilder(builder.Configuration.GetConnectionString("Default"));
builder2.Password = builder.Configuration.GetSection("DBPassword").Value;
var connectionString = builder2.ConnectionString;

// Add services to the container.
// Host.CreateDefaultBuilder(args).ConfigureHostConfiguration(configHost => {
//         configHost.AddEnvironmentVariables(prefix: "HSPA_");
// });

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<DataContext>(options =>
        options.UseSqlServer(connectionString));

var secretKey = builder.Configuration.GetSection("AppSettings:Key").Value;
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt => {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key
                };
        });

builder.Services.AddScoped<IunitOfWork,UnitOfWork>();
builder.Services.AddScoped<IPhotoService,PhotoService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

var app = builder.Build();

//app.ConfigureExceptionHandler(builder.Environment);

app.UseMiddleware<ExceptionMiddleware>();

app.UseHsts();
app.UseHttpsRedirection();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.UseHsts();
app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.Run();
