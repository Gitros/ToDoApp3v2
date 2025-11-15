namespace ToDo.Application.Tasks.Dtos
{
    public class TaskUpdateDto
    {
        public string Title { get; set; } = null!;
        public DateTime? Time { get; set; }
        public string? Description { get; set; }
        public string? Assignee { get; set; }
        public Domain.TaskStatus Status { get; set; }
        public bool IsDeleted { get; set; }
    }

}
