using Microsoft.EntityFrameworkCore;
using ToDo.Domain;

namespace ToDo.Infrastructure;

public class ToDoDbContext : DbContext
{
    public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>(e =>
        {
            e.ToTable("Tasks");
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).HasMaxLength(200).IsRequired();
            e.Property(x => x.Assignee).HasMaxLength(200).IsRequired();
            e.Property(x => x.Status).HasConversion<int>();
            e.HasOne(t => t.CreatedBy).WithMany().HasForeignKey(t => t.CreatedById).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<AppUser>(e =>
        {
            e.ToTable("AppUsers");
            e.HasKey(u => u.Id);

            e.Property(u => u.IdentityId).HasMaxLength(200).IsRequired();
            e.Property(u => u.Username).HasMaxLength(200).IsRequired();
            e.Property(u => u.PinHash).HasMaxLength(200).IsRequired();
        });
    }
}
