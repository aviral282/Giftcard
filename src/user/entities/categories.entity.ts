import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("categories_lookup", { schema: "giftcardapi" })
export class CategoriesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "CategoryId" })
  CategoryId: number;

  @Column("varchar", { name: "CategoryName", length: 500 })
  CategoryName: string;

}
