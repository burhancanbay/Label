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

  @Column({ name: "tweet_id", nullable: false })
  tweetId: string;

  @Column({ name: "user_name", nullable: false })
  userName: string;

  @Column({ name: "start_of", nullable: false })
  startOf: number;

  @Column({ name: "end_of", nullable: false })
  endOf: number;

  @Column({ name: "word_name", nullable: true })
  wordName: string;

  @Column({ name: "opinion", nullable: false })
  opinion: number;

  @Column({ name: "is_all", nullable: false })
  isAll: boolean;

  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    name: "deleted_at",
  })
  deletedAt: Date;
}
