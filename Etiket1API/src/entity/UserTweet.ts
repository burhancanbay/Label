import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Opinion } from "./Opinion";

@Entity()
export class UserTweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "tweet_id", nullable: false })
  tweetId: number;

  @ManyToOne(() => User, (user) => user.usertweets, { nullable: false })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_id",
  })
  user: User;

  @ManyToOne(() => Opinion, (opinion) => opinion.usertweets)
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
}
