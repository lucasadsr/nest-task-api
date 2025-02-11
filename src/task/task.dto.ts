import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @ApiProperty({
    example: 'Estudar NestJS',
  })
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @ApiProperty({ example: 'Aprender a criar um CRUD com NestJS' })
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  @ApiProperty({ example: 'TO_DO' })
  status: TaskStatusEnum;

  @IsDateString()
  @ApiProperty({ example: '2025-02-11' })
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}

export class TaskRouteParameters {
  @IsUUID()
  id: string;
}
