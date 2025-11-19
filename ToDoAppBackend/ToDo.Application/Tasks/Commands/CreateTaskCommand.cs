using AutoMapper;
using MediatR;
using ToDo.Application.Tasks.Dtos;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Commands;

public record CreateTaskCommand(
    string Title,
    DateTime? Time,
    string? Description,
    string? Assignee,
    Domain.TaskStatus Status
    ) : IRequest<TaskReadDto>;
public class CreateTaskHandler : IRequestHandler<CreateTaskCommand, TaskReadDto>
{
    private readonly ToDoDbContext _db;
    private readonly IMapper _mapper;

    public CreateTaskHandler(ToDoDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<TaskReadDto> Handle(CreateTaskCommand r, CancellationToken ct)
    {
        var entity = _mapper.Map<TaskItem>(r);

        _db.Tasks.Add( entity );
        await _db.SaveChangesAsync(ct);
        return _mapper.Map<TaskReadDto>(entity) ;
    }
}
