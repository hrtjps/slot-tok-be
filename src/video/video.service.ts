import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { Video } from 'src/entities/Video';
import { VideoEngagement } from 'src/entities/VideoEngagement';

@Injectable()
export class VideoService {

  constructor(
    private readonly em: EntityManager
  ) { }

  async findAll() {
    const videos = await this.em.findAll(Video, {
      populate: ["engagements"],
      orderBy: {
        id: 'ASC'
      }
    });
    return videos;
  }

  async countAll() {
    const videoCount = await this.em.count(Video);
    return videoCount;
  }

  async findOne(id: number, userId: number) {
    const video = await this.em.findOne(Video, {
      id
    }, {
      populate: ["engagements"],
      populateFilter: {
        engagements: { user: {$eq: userId }}
      }
    });

    return video;
  }

  async updateEngagement(videoId: number, userKey: string, action: "like" | "favourite") {
    const user = await this.em.findOne(User, {
      key: userKey
    });

    if (user) {
      const engagement = await this.em.findOne(VideoEngagement, {
        video: videoId,
        action: action,
        user: user.id
      });

      if (engagement) {
        this.em.remove(engagement);
      } else {
        this.em.create(VideoEngagement, {
          video: videoId,
          action: action,
          user: user.id
        });
      }

    }

    await this.em.flush();
  }

}
