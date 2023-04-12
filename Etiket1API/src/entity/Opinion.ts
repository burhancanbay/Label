import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserTweet } from "./UserTweet";
import { UserWord } from "./UserWord";

@Entity({ name: "opinion_option" })
export class Opinion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "option_name", nullable: false, unique: true })
  opinionName: string;

  @OneToMany(() => UserTweet, (usertweet) => usertweet.opinion)
  usertweets: UserTweet[];

  @OneToMany(() => UserWord, (userword) => userword.opinion)
  userwords: UserWord[];

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
