using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Application.Tasks.Dtos;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Queries;

public record GetTaskByIdQuery(Guid Id) : IRequest<TaskReadDto?>;

public class GetTaskByIdHandler : IRequestHandler<GetTaskByIdQuery, TaskReadDto?>
{
    private readonly ToDoDbContext _db;
    private readonly IMapper _mapper;

    public GetTaskByIdHandler(ToDoDbContext db, IMapper mapper) {
        _db = db;
        _mapper = mapper;
    }

    public async Task<TaskReadDto?> Handle(GetTaskByIdQuery q, CancellationToken ct)
    {
        return await _db.Tasks
            .AsNoTracking()
            .Where(t => t.Id == q.Id && !t.IsDeleted)
            .ProjectTo<TaskReadDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(ct);
    }
}
