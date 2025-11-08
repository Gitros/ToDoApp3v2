using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Tasks.Commands;
using ToDo.Application.Tasks.Queries;
using ToDo.Domain;
using ToDo.Infrastructure;

[ApiController]
[Route("api/[controller]")]
public class TasksController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> Get([FromQuery] ToDo.Domain.TaskStatus? status)
        => await mediator.Send(new GetTasksQuery(status));

    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateTaskCommand cmd)
    {
        var id = await mediator.Send(cmd);
        return CreatedAtAction(nameof(GetById), new { id }, id);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TaskItem>> GetById(Guid id, [FromServices] IMediator mediator)
    {
        var task = await mediator.Send(new GetTaskByIdQuery(id));
        if (task is null)
            return NotFound();

        return Ok(task);
    }
}
