import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Video } from '../../entities/Video';

export class VideoSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    
    const urls = [
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    ];

    urls.map((url) => {
      em.create(Video, {
        url
      });
    });

  }

}
