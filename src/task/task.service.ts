import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, id: number) {
    const isExist = await this.taskRepository.findBy({
      user: { id },
      title: createTaskDto.title,
    })

    if(isExist.length) 
      throw new BadRequestException('This task already exist!')

    const newTask = {
      title: createTaskDto.title,
      user: {
        id,
      },
    }

    return await this.taskRepository.save(newTask)
  }

  async findAll(id: number) {
    return await this.taskRepository.find({
      where: {
        user: { id },
      },
      relations: {
        projects: true,
      },
    })
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        user: true,
        projects: true,
      },
    })

    if(!task) throw new NotFoundException('Task not found')

    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    })

    if(!task) throw new NotFoundException('Task not found!')
    return await this.taskRepository.update(id, updateTaskDto)
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: {id}
    })

    if(!task) throw new NotFoundException('Task not found!')

    return await this.taskRepository.delete(id);
  }
}
