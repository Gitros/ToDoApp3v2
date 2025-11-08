using Microsoft.EntityFrameworkCore;
using ToDo.Domain;

namespace ToDo.Infrastructure;

public class ToDoDbContext : DbContext
{
    public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>(e =>
        {
            e.ToTable("Tasks");
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).HasMaxLength(200).IsRequired();
            e.Property(x => x.Assignee).HasMaxLength(200).IsRequired();
            e.Property(x => x.Status).HasConversion<int>();
        });
    }
}
