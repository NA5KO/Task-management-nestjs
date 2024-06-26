import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task-dto";


export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto :CreateTaskDto) : Promise <Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        try {
            await task.save();
        } catch (error) {
            console.log(error);
        }
        return task;
    }
    async getalltasks() : Promise<Task[]>{
        return await this.find();
    }
}