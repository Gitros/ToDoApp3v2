namespace ToDo.Domain;

public class AppUser
{
    public Guid Id { get; set; }
    public string IdentityId { get; set; } = default!;
    public string Username { get; set; } = default!;
    public required string PinHash { get; set; }
}
