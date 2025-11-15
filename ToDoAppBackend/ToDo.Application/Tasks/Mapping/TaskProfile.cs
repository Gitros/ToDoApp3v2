using AutoMapper;
using ToDo.Application.Tasks.Commands;
using ToDo.Application.Tasks.Dtos;
using ToDo.Domain;

namespace ToDo.Application.Tasks.Mapping;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<TaskItem, TaskReadDto>();
        CreateMap<TaskCreateDto, CreateTaskCommand>();

        CreateMap<CreateTaskCommand, TaskItem>()
            .ForMember(d => d.Id, opt => opt.MapFrom(_ => Guid.NewGuid()))
            .ForMember(d => d.IsDeleted, opt => opt.MapFrom(_ => false));
    }
}
