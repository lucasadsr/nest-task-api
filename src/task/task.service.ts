import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return task;
  }

  update(task: TaskDto): TaskDto {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex < 0) {
      throw new NotFoundException(`Task with id ${task.id} not found.`);
    }

    this.tasks[taskIndex] = task;
    return task;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
