import { Collection, Entity, Index, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { VideoEngagement } from "./VideoEngagement";

@Entity()
@Index({ properties: ['id'], type: 'btree' })
export class Video extends BaseEntity {

    @Property()
    url!: string;

    @OneToMany(() => VideoEngagement, engage => engage.video)
    engagements = new Collection<VideoEngagement>(this);
}