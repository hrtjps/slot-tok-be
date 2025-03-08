import { Migration } from '@mikro-orm/migrations';

export class Migration20250307120655 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "game_states" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "game_id" varchar(255) not null, "reels" varchar(255) not null, "bet" int not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "username" varchar(255) not null, "balance" int not null, "key" varchar(255) not null);`);

    this.addSql(`create table "video" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "url" varchar(255) not null);`);
    this.addSql(`create index "video_id_index" on "video" using btree ("id");`);

    this.addSql(`create table "video_engagement" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "video_id" int not null, "user_id" int not null, "action" text check ("action" in ('like', 'favourite')) not null);`);
    this.addSql(`create index "video_engagement_id_index" on "video_engagement" using btree ("id");`);

    this.addSql(`alter table "video_engagement" add constraint "video_engagement_video_id_foreign" foreign key ("video_id") references "video" ("id") on update cascade;`);
    this.addSql(`alter table "video_engagement" add constraint "video_engagement_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "video_engagement" drop constraint "video_engagement_user_id_foreign";`);

    this.addSql(`alter table "video_engagement" drop constraint "video_engagement_video_id_foreign";`);

    this.addSql(`drop table if exists "game_states" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "video" cascade;`);

    this.addSql(`drop table if exists "video_engagement" cascade;`);
  }

}
