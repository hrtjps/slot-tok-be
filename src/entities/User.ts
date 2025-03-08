import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {

    @Property()
    username: string;

    @Property()
    balance: number;

    @Property()
    key: string;
}