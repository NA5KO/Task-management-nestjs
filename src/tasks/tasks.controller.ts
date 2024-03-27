import { Body, Controller, Get, Post ,Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { get } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getTasks(@Query(ValidationPipe) filterdto: GetTasksFilterDto): Promise<Task[]>{
        return this.tasksService.getAllTasks();
    }

    

    @Get('/:id')
    getTaskbyId(@Param('id',ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskbyId(id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task>
    {
        return this.tasksService.createTask(CreateTaskDto);
    }
/*
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.DeleteTask(id);
    }

    @Patch('/:id/status')
    UpdateTaskStatus(@Param('id') id: string, @Body('status',TaskStatusValidationPipe) status: TaskStatus): Task{
        return this.tasksService.UpdateTaskStatus(id, status);
    

    }
    */
}
