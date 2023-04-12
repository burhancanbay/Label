import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name", nullable: false })
  userName: string;

  @Column({ name: "tweet_id", nullable: false })
  tweetId: string;

  @Column({ name: "tweet_text", type: "text", nullable: false })
  tweetText: any;

  @Column({ name: "tweet_opinion", nullable: false })
  tweetOpinion: number;

  @Column({ name: "json_field", type: "json", array: true, nullable: false })
  jsonField: any;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    name: "deleted_at",
  })
  deletedAt: Date;
}
