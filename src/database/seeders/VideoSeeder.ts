import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Video } from '../../entities/Video';

export class VideoSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    
    const urls = [
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
      "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
      "http://cdn-fms.rbs.com.br/vod/hls_sample1_manifest.m3u8",
      "http://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_1000_av-p.m3u8?sd=10&rebase=on",
      "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
      "http://walterebert.com/playground/video/hls/sintel-trailer.m3u8",
      "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
      "https://devimages.apple.com.edgekey.net/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8",
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      "https://d1gnaphp93fop2.cloudfront.net/videos/multiresolution/rendition_new10.m3u8",
      "https://res.cloudinary.com/dannykeane/video/upload/sp_full_hd/q_80:qmax_90,ac_none/v1/dk-memoji-dark.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://diceyk6a7voy4.cloudfront.net/e78752a1-2e83-43fa-85ae-3d508be29366/hls/fitfest-sample-1_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_30Hz_6.0Mbps_qvbr.m3u8",
      "https://assets.afcdn.com/video49/20210722/v_645516.m3u8",
      "https://new.ptvcrickethd.com/pak/media.stream/playlist.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/661f570aab9d840019942b80-473e0b/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/662aae7a42cd740019b91dec-3e114f/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/663e5a1542cd740019b97dfa-ccf0e6/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/663d1244f22a010019f3ec12-f3c958/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/664ce52bd6fcda001911a88c-8f1c4d/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/664d87dfe8e47500199ee49e-dbd56b/video_h1.m3u8",
      "https://flipfit-cdn.akamaized.net/flip_hls/6656423247ffe600199e8363-15125d/video_h1.m3u8",
    ];

    urls.map((url) => {
      em.create(Video, {
        url
      });
    });

  }

}
