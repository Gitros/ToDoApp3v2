using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Queries;

public record GetTaskByIdQuery(Guid Id) : IRequest<TaskItem?>;

public class GetTaskByIdHandler : IRequestHandler<GetTaskByIdQuery, TaskItem>
{
    private readonly ToDoDbContext _db;
    public GetTaskByIdHandler(ToDoDbContext db) => _db = db;

    public async Task<TaskItem?> Handle(GetTaskByIdQuery q, CancellationToken ct)
    {
        return await _db.Tasks
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == q.Id && !t.IsDeleted, ct);
    }
}
