import { User } from "./User";
import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./Base";

@ObjectType()
@Entity()
export class Todo extends Base {
  @Field()
  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  text!: string;

  @Field()
  @Column({ nullable: false, default: false })
  completed!: boolean;

  @Field((type) => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  dueDate!: Date;

  @ManyToOne(() => User, (user) => user.todos, {
    lazy: true, // lazy load only when requested (graphql query e.g.)
    nullable: false,
  })
  user!: User;
}
