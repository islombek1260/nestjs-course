import { CourseEntity } from '../../course/entity/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity("files")
export class CourseFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  filePath: string;

  @ManyToOne(() => CourseEntity, (course) => course.files)
  course: CourseEntity;
}