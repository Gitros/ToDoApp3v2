using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Commands;

public record UpdateTaskCommand(
    Guid Id,
    string Title,
    DateTime? Time,
    string? Description,
    string? Assignee,
    Domain.TaskStatus Status,
    bool IsDeleted
    ) : IRequest<Unit>;

public class UpdateTaskHandler : IRequestHandler<UpdateTaskCommand, Unit>
{
    private readonly ToDoDbContext _db;
    public UpdateTaskHandler(ToDoDbContext db) => _db = db;

    public async Task<Unit> Handle(UpdateTaskCommand r, CancellationToken ct)
    {
        var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == r.Id, ct);
        if (task is null)
            throw new KeyNotFoundException($"Task`{r.Id}` not found");

        task.Title = r.Title;
        task.Time = r.Time;
        task.Description = r.Description;
        task.Assignee = r.Assignee;
        task.Status = r.Status;
        task.IsDeleted = r.IsDeleted;

        await _db.SaveChangesAsync(ct);
        return Unit.Value;
    }
}
