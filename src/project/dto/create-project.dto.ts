import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"
import { Task } from "src/task/entities/task.entity"
import { User } from "src/user/entities/user.entity"

export class CreateProjectDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsString()
    @MinLength(6)
    type: 'expense' | 'income'

    @IsNotEmpty()
    task: Task
    @IsNotEmpty()
    user: User
}
