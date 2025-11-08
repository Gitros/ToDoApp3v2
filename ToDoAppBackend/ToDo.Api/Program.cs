using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.Tasks.Commands;
using ToDo.Application.Tasks.Queries;
using ToDo.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// EF Core (DbContext in Infrastructure)
builder.Services.AddDbContext<ToDoDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// MediatR (scan Application assembly that contains handlers)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<CreateTaskCommand>());

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
app.UseAuthorization();

app.MapControllers();

// (Optional) Minimal endpoints if you don't want controllers yet:
// app.MapGet("/api/tasks", async (IMediator m, TaskStatus? status) => await m.Send(new GetTasksQuery(status)));
// app.MapPost("/api/tasks", async (IMediator m, CreateTaskCommand cmd) => Results.Ok(await m.Send(cmd)));

app.Run();
