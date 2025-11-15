using AutoMapper;
using ToDo.Application.Tasks.Dtos;
using ToDo.Domain;

namespace ToDo.Application.Tasks.Mapping;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<TaskItem, TaskReadDto>();
    }
}
