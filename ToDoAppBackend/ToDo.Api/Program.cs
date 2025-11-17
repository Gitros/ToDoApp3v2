using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using ToDo.Application.Tasks.Commands;
using ToDo.Application.Tasks.Mapping;
using ToDo.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddKeycloakWebApiAuthentication(builder.Configuration);

// 2) Autoryzacja (opcjonalnie – fallback = wymaga auth)
builder.Services
    .AddAuthorization(options =>
    {
        options.FallbackPolicy = options.DefaultPolicy;
    })
        .AddKeycloakAuthorization(builder.Configuration);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p => p
        .WithOrigins("https://localhost:5173", "https://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

// EF Core (DbContext in Infrastructure)
builder.Services.AddDbContext<ToDoDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// MediatR (scan Application assembly that contains handlers)
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UpdateTaskHandler).Assembly));

// Automapper
builder.Services.AddAutoMapper(cfg => { }, typeof(TaskProfile).Assembly);

// Controllers / Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
