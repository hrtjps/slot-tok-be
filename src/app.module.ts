import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game/game.gateway';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VideoModule } from './video/video.module';
import mikroOrmConfig from './mikro-orm.config';
import { VideoService } from './video/video.service';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensures all modules can access environment variables
    }),
    GameModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    VideoModule
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway, GameService, VideoService, UserService],
})
export class AppModule {}
