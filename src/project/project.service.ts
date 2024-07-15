import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, id: number) {
    const newProject = {
      title: createProjectDto.title,
      amount: createProjectDto.amount,
      type: createProjectDto.type,
      task: { id: +createProjectDto.task },
      user: { id },      
    }

    

    if(!newProject) 
      throw new BadRequestException('Something went wrong...')
    return await this.projectRepository.save(newProject);
  }

  async findAll(id: number) {
    const projects = await this.projectRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      }
    })
    return projects;
  }

 
  async findOne(id: number) {
    const project =  await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        task: true,
      }
    })
    if(!project) throw new NotFoundException('Project not found')
    return Project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
    })

    if(!project) throw new NotFoundException('Project not Found')


    return await this.projectRepository.update(id, updateProjectDto)
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
    })

    if(!project) throw new NotFoundException('Project not Found')

    return await this.projectRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const projects = await this.projectRepository.find({
      where: {
        user: { id }
      },
      relations: {
        task: true,
        user: true,
      },
      order: {
        createdAt: "DESC"
      },
      take: limit,
      skip: (page -1) * limit,
    })

    return projects
  }
}

