import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class GameStates extends BaseEntity {

    @Property()
    userId: number;

    @Property()
    gameId: string;

    @Property()
    reels: string;

    @Property()
    bet: number;
}