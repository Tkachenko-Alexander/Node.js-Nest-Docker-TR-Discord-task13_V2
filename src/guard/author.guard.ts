import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectService } from "src/project/project.service";
import { TaskService } from "src/task/task.service";

@Injectable()
export class AuthorCuard implements CanActivate {

    constructor(
        private readonly projectService: ProjectService,
        private readonly taskService: TaskService
    ) {
        
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id, type } = request.params

        let entity

        switch (type) {
            case 'projects':
                entity = await this.projectService.findOne(id)
                                
                break;
            case 'task':
                entity = await this.taskService.findOne(id)
                break;
            default:
                throw new NotFoundException('Something went wrong....')
        }

        const user = request.user

        if(entity && user && entity.user.id === user.id) {
            return true
        }       
        
        throw new BadRequestException('Something went wrong....')
    }
}