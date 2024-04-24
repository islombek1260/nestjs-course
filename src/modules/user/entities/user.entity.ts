import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { CourseEntity } from '../../course/entity/course.entity';
import { UserFileEntity } from '../../file-upload/entities/user.file.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
  
  @OneToMany(() => UserFileEntity, (files) => files.user)
  userfiles: UserFileEntity[];

  @OneToMany(() => UserFileEntity, (files) => files.user)
  files: UserFileEntity[]

  @OneToMany(() => CourseEntity, (courses) => courses.users)
  courses: CourseEntity[];
}