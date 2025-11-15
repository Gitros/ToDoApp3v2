namespace ToDo.Application.Tasks.Dtos;

public record TaskReadDto (
    Guid Id,
    string Title,
    DateTime? Time,
    string? Description,
    string? Assignee,
    Domain.TaskStatus Status
    );