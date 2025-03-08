import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import * as md5 from 'md5';
import { v1 as uuidv1 } from 'uuid';
import { VideoService } from 'src/video/video.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: true })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly dbService: GameService,
    private readonly videoService: VideoService,
    private readonly userService: UserService
  ) { }

  @SubscribeMessage('login')
  async handleLogin(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    try {
      if (!data.key) {
        const key = md5(uuidv1());
        const username = 'Guest';
        const balance = 10000.00;
        await this.dbService.createNewUser(username, balance, key);
        socket.emit('login', { status: 'logged-in', key, username, balance });
      } else {
        const user = await this.dbService.getUser(data.key);
        socket.emit('login', { status: 'logged-in', key: data.key, username: user.username, balance: user.balance });
      }
    } catch (err) {
      console.error(err);
    }
  }

  @SubscribeMessage('balance')
  async handleBalance(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    try {
      const account = await this.dbService.getUser(data.key);
      socket.emit('balance', account.balance);
    } catch (err) {
      console.error(err);
    }
  }

  @SubscribeMessage('gamestate')
  async handleGamestate(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    try {
      const account = await this.dbService.getUser(data.key);
      const gamestate = await this.dbService.getOrCreateGamestate(account.id, data.gameId);
      socket.emit('gamestate', { balance: account.balance, bet: gamestate.bet, reels: JSON.parse(gamestate.reels) });
    } catch (err) {
      console.error(err);
    }
  }

  @SubscribeMessage('bet')
  async hanldeBet(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    try {
      const account = await this.dbService.getUser(data.key);
      const betAmount = data.bet;
      if (account.balance >= betAmount) {
        const betResult = this.dbService.generateBetResult(data.gameId, betAmount);

        let winAmount = 0;
        betResult.lines.forEach((line) => {
          winAmount += line.amount;
        });

        const newBalance = (Math.round((account.balance - betAmount + winAmount) * 100) / 100);
        await this.dbService.updateBalance(account.id, newBalance);
        await this.dbService.updateGamestate(account.id, data.gameId, data.bet, JSON.stringify(betResult.position));

        socket.emit('bet', {
          balance: newBalance,
          reels: betResult.position,
          isWin: betResult.lines.length > 0,
          win: betResult.lines,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('video')
  async handleVideo(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    try {

      const user = await this.userService.findOneByKey(data.key);
      const videoCount = await this.videoService.countAll();
      const id = Math.floor(Math.random() * videoCount) + 1;
      const video = await this.videoService.findOne(id, user?.id ?? 0);

      socket.emit("video", {
        video: {
          ...video,
          user_id: user?.id
        },
      });

    } catch (err) {
      console.log(err);
    }
  }
}

