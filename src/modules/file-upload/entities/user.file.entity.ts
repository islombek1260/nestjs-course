import { UserEntity } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';

@Entity("files")
export class UserFileEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
}