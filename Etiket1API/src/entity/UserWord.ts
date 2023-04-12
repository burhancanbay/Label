import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";
import { Opinion } from "./Opinion";

@Entity()
export class UserWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "word_name", nullable: false })
  wordName: string;

  @Column({ name: "start_of_end_of", nullable: false })
  startOfEndOf: string;

  @Column({ name: "tweet_id", nullable: false, unique: true })
  tweetId: number;

  @ManyToOne(() => User, (user) => user.userwords)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_id",
  })
  user: User;

  @ManyToOne(() => Opinion, (opinion) => opinion.userwords)
  @JoinColumn({
    name: "opinion_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_opinion_id",
  })
  opinion: Opinion;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    name: "deleted_at",
  })
  deletedAt: Date;
}
