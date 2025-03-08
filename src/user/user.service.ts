import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';

@Injectable()
export class UserService {

    constructor(
        private readonly em: EntityManager
    ) { }

    async findOneByKey(key: string) {
        return await this.em.findOne(User, {
            key
        });
    }

}
