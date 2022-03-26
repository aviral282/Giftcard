import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("cards", { schema: "giftcardapi" })
export class CardsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "cardid" })
  CardId: number;

  @Column("varchar", { name: "CardNumber", length: 45 })
  CardNumber: string;

  @Column("varchar", { name: "CardRecepientAddress", length: 500 })
  CardRecepientAddress: string;

  @Column("varchar", { name: "CardCustomerName", length: 500 })
  CardCustomerName: string;

  @Column("int", { name: "CardProgramId" })
  CardProgramId: number;

  @Column("int", { name: "CardPin" })
  CardPin: number;

  @Column("int", { name: "CardCreationBalance" })
  CardCreationBalance: number;

  @Column("int", { name: "CardCurrentBalance" })
  CardCurrentBalance: number;


}
