import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { UserTweet } from "./UserTweet";
import { UserWord } from "./UserWord";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ name: "user_email", nullable: false, unique: true })
  email: string;

  @Column({ name: "user_password", nullable: false })
  password: string;

  @OneToMany(() => UserTweet, (usertweet) => usertweet.user)
  usertweets: UserTweet[];

  @OneToMany(() => UserWord, (userword) => userword.user)
  userwords: UserWord[];

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 8));
  };

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  generateJWT = () => {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        password: this.password,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
  };

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
