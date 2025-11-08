using MediatR;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Commands;

public record CreateTaskCommand(
    string Title,
    DateTime? Time,
    string? Description,
    string Assignee,
    Domain.TaskStatus Status
    ) : IRequest<Guid>;
public class CreateTaskHandler : IRequestHandler<CreateTaskCommand, Guid>
{
    private readonly ToDoDbContext _db;
    public CreateTaskHandler(ToDoDbContext db) => _db = db;

    public async Task<Guid> Handle(CreateTaskCommand r, CancellationToken ct)
    {
        var entity = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = r.Title,
            Time = r.Time,
            Description = r.Description,
            Assignee = r.Assignee,
            Status = r.Status
        };

        _db.Tasks.Add( entity );
        await _db.SaveChangesAsync(ct);
        return entity.Id;
    }
}
