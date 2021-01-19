import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import { validateOrReject, IsEmpty } from "class-validator";

@Entity()
export abstract class Base {
  @IsEmpty({ message: "id is auto generated" })
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmpty({ message: "createdAt is auto generated" })
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

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
