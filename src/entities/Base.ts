import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { validateOrReject, IsEmpty } from "class-validator";

@ObjectType()
@Entity()
export abstract class Base {
  @Field((type) => ID)
  @IsEmpty({ message: "id is auto generated" })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @IsEmpty({ message: "createdAt is auto generated" })
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field()
  @IsEmpty({ message: "updatedAt is auto generated" })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  // Before inser/update to mutate the state in the persistence layer, check if integrity is guaranteed
  // Using class-validator annotations to validate the model correctness
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
