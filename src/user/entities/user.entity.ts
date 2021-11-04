import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("testtable", { schema: "giftcardapi" })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
  
  @Column("varchar", { name: "value", length: 128 })
  value: string;

}
