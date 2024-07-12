import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";









@Entity()
export class Project {
    @PrimaryColumn({ name: 'project_id'})
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    type: string

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'user_id'})
    user: User

    @ManyToOne(() => Task, (task) => task.projects)
    @JoinColumn({ name: 'task_id'})
    task: Task

    @Column()
    amount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
