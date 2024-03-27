import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

    
    async getAllTasks(): Promise<Task[]>{
        return await this.taskRepository.find();
    }

    
    async getTaskbyId(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne({ where: { id } });
        if(!found){
            throw new NotFoundException(`Task with ID "${id}"not found`);
        }
        return found;
    }
    


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
      }
/*
    DeleteTask(id: string): void{
        const found = this.GetTaskbyId(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    UpdateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.GetTaskbyId(id);
        task.status = status;
        return task;
    }

    getTasksWithFilters(filterdto: GetTasksFilterDto): Task[]{
        const {status, search} = filterdto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }
        return tasks;
    }
    */
    
}
