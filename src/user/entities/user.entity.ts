import { Project } from "src/project/entities/project.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";








@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, (task) => task.user,
     {onDelete: 'CASCADE',
     })
    tasks: Task[]

    @OneToMany(() => Project, (project) => project.user,
    {onDelete: 'CASCADE',
    })
    projects: Project[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
