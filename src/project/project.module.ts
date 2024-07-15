import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task])],
  controllers: [ProjectController],
  providers: [ProjectService, TaskService],
})
export class ProjectModule {}
