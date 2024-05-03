using Microsoft.EntityFrameworkCore;
using Bookstore_Management.Models;

var builder = WebApplication.CreateBuilder(args);

// Adaugă serviciile pentru container.
builder.Services.AddControllers();
builder.Services.AddScoped<IBookRepository, BookRepository>();

// Adaugă serviciul pentru documentarea API-urilor cu Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurarea conexiunii la baza de date MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection")));

var app = builder.Build();

// Configurează pipeline-ul de cereri HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Adaugă middleware-ul pentru gestionarea politicii CORS
app.UseCors(options => options
    .WithOrigins("http://localhost:63343") // Modifică originul la portul corect
    .AllowAnyHeader()
    .AllowAnyMethod()
);


app.UseAuthorization();
app.MapControllers();

app.Run();
