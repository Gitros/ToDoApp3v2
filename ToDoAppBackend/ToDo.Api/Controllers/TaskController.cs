using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Tasks.Commands;
using ToDo.Application.Tasks.Queries;
using ToDo.Domain;

[ApiController]
[Route("api/[controller]")]
public class TasksController(IMediator mediator) : ControllerBase
{
    [HttpGet("GetTasks")]
    public async Task<ActionResult<List<TaskItem>>> GetTasks([FromQuery] ToDo.Domain.TaskStatus? status)
        => await mediator.Send(new GetTasksQuery(status));

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateTask([FromBody] CreateTaskCommand cmd)
    {
        var id = await mediator.Send(cmd);
        return CreatedAtAction(nameof(GetTaskById), new { id }, id);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TaskItem>> GetTaskById(Guid id, [FromServices] IMediator mediator)
    {
        var task = await mediator.Send(new GetTaskByIdQuery(id));
        if (task is null)
            return NotFound();

        return Ok(task);
    }
}
