import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
  }

  findById(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return task;
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title && task.title.includes(params.title)) {
        match = false;
      }

      if (params.status && task.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
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
