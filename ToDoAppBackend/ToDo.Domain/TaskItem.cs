namespace ToDo.Domain;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public DateTime? Time { get; set; }
    public string? Description { get; set; }
    public string? Assignee { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.New;
    public bool IsDeleted { get; set; }

    public Guid CreatedById { get; set; }
    public AppUser CreatedBy { get; set; } = default!;
}

public enum TaskStatus
{
    New,
    InProgress,
    Completed
}
