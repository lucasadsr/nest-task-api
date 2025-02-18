import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({
    status: 201,
    description: 'task criada com sucesso.',
    type: TaskDto,
  })
  async create(@Body() task: TaskDto) {
    return await this.taskService.create(task);
  }

  @ApiOperation({ summary: 'Busca task por id' })
  @ApiResponse({
    status: 200,
    type: TaskDto,
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Task with id 4a3d6ab0-8c77-4703-b445-06bd214a38b5 not found.',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'Busca tasks por query params' })
  @ApiResponse({
    status: 200,
    type: TaskDto,
    isArray: true,
  })
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }

  @ApiOperation({ summary: 'Edita uma task' })
  @ApiResponse({
    status: 200,
    description: 'Task atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Task with id 4a3d6ab0-8c77-4703-b445-06bd214a38b5 not found.',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.taskService.update(params.id, task);
  }

  @ApiOperation({ summary: 'Deleta uma task' })
  @ApiResponse({
    status: 200,
    description: 'Task deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Task with id 4a3d6ab0-8c77-4703-b445-06bd214a38b5 not found.',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
