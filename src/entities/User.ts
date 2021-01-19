import { Todo } from "./Todo";
import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Base } from "./Base";

@ObjectType()
@Entity()
export class User extends Base {
  @Field((type) => ID)
  @IsNotEmpty()
  @Column({ length: 250, nullable: false, unique: true })
  username!: string;

  @Field()
  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  firstName!: string;

  @Field()
  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  lastName!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  password!: string;

  @Field((type) => Date)
  @Column({ type: "timestamp", nullable: true })
  @IsEmpty()
  lastLogged!: Date;

  @JoinColumn({ name: "userId" })
  @OneToMany(() => Todo, (todo) => todo.user, {
    lazy: true, // lazy load only when requested (graphql query e.g.)
    cascade: ["remove"],
  })
  todos!: Todo[];
}
