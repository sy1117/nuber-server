import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryGeneratedColumn } from "typeorm";
import { verificationTarget } from "../types/types";

const PHONE = "PHONE", EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {

    @PrimaryGeneratedColumn() id:number;

    @Column({ type: "text", enum:[PHONE, EMAIL] })
    target : verificationTarget;
    @Column({ type: "text" })
    payload : string;
    @Column({ type: "text" })
    key : string;

    @Column({type:"boolean", default: false})
    verified: boolean;

    @CreateDateColumn ({type: "text"})
    createdAt : string;
    @UpdateDateColumn ({type:"text"})
    updatedAt : string;

    @BeforeInsert()
    createKey(): void{
        if(this.target == PHONE){
            this.key = Math.floor(Math.random()*10000).toString();
        }else if(this.target == EMAIL){
            this.key = Math.random()
                .toString(36)
                .substr(2);
        }
    }
}

export default Verification;