import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("cardprograms", { schema: "giftcardapi" })
export class CardProgramEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "cardprogramId" })
  CardProgramId: number;

  @Column("varchar", { name: "cardprogramname", length: 500 })
  CardProgramName: string;

  @Column("varchar", { name: "cardDisplayName", length: 500 })
  CardProgramDisplayName: string;

  @Column("int", { name: "merchantId" })
  CardProgramMerchantId: number;

  @Column("int", { name: "cardPrice" })
  CardPrice: number;

  @Column("int", { name: "carddiscount" })
  CardDiscount: number;


}
