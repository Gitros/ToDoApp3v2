using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Commands;

public record DeleteTaskCommand(Guid Id) : IRequest<Unit>;

public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand, Unit>
{
    private readonly ToDoDbContext _db;
    public DeleteTaskHandler(ToDoDbContext db) => _db = db;

    public async Task<Unit> Handle(DeleteTaskCommand r, CancellationToken ct)
    {
        var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == r.Id, ct);
        if (task is null)
            throw new KeyNotFoundException($"Task `{r.Id}` not found");

        task.IsDeleted = true;

        await _db.SaveChangesAsync(ct);
        return Unit.Value;
    }
}