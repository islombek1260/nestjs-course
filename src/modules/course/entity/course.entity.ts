import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CourseFileEntity } from '../../file-upload/entities/course.file.entity';

@Entity('orders')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => CourseFileEntity, (files) => files.course)
  files: CourseFileEntity;

  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity;

  @OneToMany(() => UserEntity, (users) => users.courses)
  users: UserEntity[];
}