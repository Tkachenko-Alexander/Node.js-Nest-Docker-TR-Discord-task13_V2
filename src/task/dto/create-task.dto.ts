import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string
    @IsOptional()
    user?: User
}
