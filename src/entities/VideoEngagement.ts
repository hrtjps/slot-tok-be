import { Entity, Enum, Index, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Video } from "./Video";
import { User } from "./User";

@Entity()
@Index({properties: ['id'], type: 'btree'})
export class VideoEngagement extends BaseEntity {

    @ManyToOne(() => Video, "id")
    video!: Video;

    @ManyToOne(() => User, "id")
    user!: User;

    @Enum(() => ["like", "favourite"])
    action: "like" | "favourite"
}