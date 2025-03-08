import { Injectable } from '@nestjs/common';
import egyptianTreasuresData from '../games-data/egyptian-treasures';
import { GameStates, User } from 'src/entities';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class GameService {
    constructor(
        private readonly em: EntityManager
    ) {

    }

    async createNewUser(username: string, balance: number, key: string) {
        this.em.create(User, {
            username, balance, key
        });

        await this.em.flush();
    }

    async getUser(key: string): Promise<any> {

        const user = await this.em.findOne(User, {
            key
        });

        return user;
    }

    generateRandomReelsPosition(gameId: string):  number[][] {
        const position: number[][] = [];
        let reelsCount: number = 0;
        let reelPositions: number = 0;
        let symbolsCount: number = 0;

        switch (gameId) {
            case 'egyptian-treasures':
                reelsCount = egyptianTreasuresData.reelsCount;
                reelPositions = egyptianTreasuresData.reelPositions;
                symbolsCount = egyptianTreasuresData.symbolsCount;
                break;
        }

        for (let i = 0; i < reelsCount; i++) {
            position.push(Array.from(Array(reelPositions + 1)).map(() => {
                return Math.floor(Math.random() * symbolsCount) + 1;
            }));
        }

        return position;
    }

    async getOrCreateGamestate(userId: number, gameId: string): Promise<any> {

        const gameStates = await this.em.find(GameStates, {
            userId,
            gameId
        });

        if (gameStates.length === 1) {
            // retrieve gamestate
            return gameStates[0];
        } else {
            // create new gamestate
            const bet = 10;
            const reels = JSON.stringify(this.generateRandomReelsPosition(gameId));

            const newGamestate = this.em.create(GameStates, {
                userId,
                gameId,
                reels,
                bet,
            });

            return newGamestate;

        }
    }

    processReelsPosition(gameId: string, betAmount: number, position: number[][]) {
        const result: Object[] = [];
        let linesPositions, symbolsMultipliers;

        switch (gameId) {
            case 'egyptian-treasures':
                linesPositions = egyptianTreasuresData.linesPositions;
                symbolsMultipliers = egyptianTreasuresData.symbolsMultipliers;
                break;
        }

        linesPositions.forEach((linePosition, i) => {
            let symbolsInLine: number[] = [];
            for (let j = 0; j < linePosition.length; j++) {
                for (let k = 0; k < linePosition[j].length; k++) {
                    if (linePosition[j][k] === 1) {
                        symbolsInLine.push(position[j][k]);
                    }
                }
            }

            let identicalSymbol = symbolsInLine[0];
            let identicalSymbolsCount = 1;
            for (let j = 1; j < symbolsInLine.length; j++) {
                if (identicalSymbol === symbolsInLine[j]) {
                    identicalSymbolsCount++;
                } else {
                    break;
                }
            }

            if (identicalSymbolsCount >= 3) {
                result.push({
                    number: i + 1,
                    symbol: identicalSymbol,
                    count: identicalSymbolsCount,
                    map: linePosition,
                    amount: Math.round(betAmount * symbolsMultipliers[identicalSymbol][identicalSymbolsCount - 3].multiplier * 100) / 100,
                });
            }
        });

        return result;
    }

    generateBetResult(gameId: string, betAmount: number) {
        let position: number[][] = [], lines;

        switch (gameId) {
            case 'egyptian-treasures':
                position = this.generateRandomReelsPosition(gameId);
                break;
        }

        lines = this.processReelsPosition(gameId, betAmount, position);

        return {
            position,
            lines,
        };
    }

    async updateBalance(userId: number, value: number) {

        const user = await this.em.findOne(User, {
            id: userId
        });

        if (user) {
            user.balance = value;
        }

        await this.em.flush();
    }

    async updateGamestate(userId: number, gameId: string, bet: number, reels: string) {

        const gameStates = await this.em.findOne(GameStates, {
            userId,
            gameId
        });

        if (gameStates) {
            gameStates.reels = reels;
            gameStates.bet = bet;
        }
        await this.em.flush();
    }
}
