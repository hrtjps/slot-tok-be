import { Logger } from '@nestjs/common';
import { User, BaseEntity, GameStates } from './entities';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { Video } from './entities/Video';
import { VideoEngagement } from './entities/VideoEngagement';
import { SeedManager } from '@mikro-orm/seeder';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [User, GameStates, Video, VideoEngagement],
  dbName: 'slot-tok',
  user: "postgres",
  password: "111",
  port: 7216,
  debug: true,
  logger: logger.log.bind(logger),
  allowGlobalContext: true,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './src/database/migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  seeder: {
    path: "./src/database/seeders",
    pathTs: undefined, // path to the folder with TS seeders (if used, you should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  extensions: [Migrator, SeedManager]
});