import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";









@Entity()
export class Task {
    @PrimaryGeneratedColumn({name: 'task_id'})
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'user_id'})
    user: User

    @OneToMany(() => Project, (project) => project.task)
    //@JoinColumn({ name: 'project_id'})
    projects: Project[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
