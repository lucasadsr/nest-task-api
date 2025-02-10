import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task-entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRespository: Repository<TaskEntity>,
  ) {}

  private tasks: TaskDto[] = [];

  async create(task: TaskDto) {
    const { title, description, expirationDate } = task;

    const taskToSave: TaskEntity = {
      title,
      description,
      status: TaskStatusEnum.TO_DO,
      expirationDate,
    };

    const createdTask = await this.taskRespository.save(taskToSave);

    return this.mapEntityToDto(createdTask);
  }

  async findById(id: string): Promise<TaskDto> {
    const task = await this.taskRespository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return this.mapEntityToDto(task);
  }

  async findAll(params: FindAllParameters): Promise<TaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchParams.status = Like(params.status as TaskStatusEnum);
    }

    const tasksFound = await this.taskRespository.find({
      where: {
        title: searchParams.title,
        status: searchParams.status,
      },
    });

    return tasksFound.map((task) => this.mapEntityToDto(task));
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

  private mapEntityToDto(TaskEntity: TaskEntity): TaskDto {
    return {
      id: TaskEntity.id,
      title: TaskEntity.title,
      description: TaskEntity.description,
      expirationDate: TaskEntity.expirationDate,
      status: TaskStatusEnum[TaskEntity.status],
    };
  }
}
