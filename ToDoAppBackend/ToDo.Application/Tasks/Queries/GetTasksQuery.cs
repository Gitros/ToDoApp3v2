using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Queries;

public record GetTasksQuery(Domain.TaskStatus? Status = null) : IRequest<List<TaskItem>>;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<TaskItem>>
{
    private readonly ToDoDbContext _db;
    public GetTasksHandler(ToDoDbContext db) => _db = db;

    public async Task<List<TaskItem>> Handle(GetTasksQuery q, CancellationToken ct)
    {
        var query = _db.Tasks.AsNoTracking().Where(t => !t.IsDeleted);
        if (q.Status.HasValue) query = query.Where(t => t.Status == q.Status);
        return await query.ToListAsync(ct);
    }
}

