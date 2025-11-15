using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Application.Tasks.Dtos;
using ToDo.Domain;
using ToDo.Infrastructure;

namespace ToDo.Application.Tasks.Queries;

public record GetTasksQuery(Domain.TaskStatus? Status = null) : IRequest<List<TaskReadDto>>;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<TaskReadDto>>
{
    private readonly ToDoDbContext _db;
    private readonly IMapper _mapper;
    public GetTasksHandler(ToDoDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<TaskReadDto>> Handle(GetTasksQuery q, CancellationToken ct)
    {
        var query = _db.Tasks
            .AsNoTracking()
            .Where(t => !t.IsDeleted);

        if (q.Status.HasValue)
            query = query.Where(t => t.Status == q.Status);

        return await query
            .ProjectTo<TaskReadDto>(_mapper.ConfigurationProvider)
            .ToListAsync(ct);
    }
}

