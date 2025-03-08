import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Response, Res } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post("/like")
  async addOrRemove(@Body() body, @Res() res) {
    try {
      const { userKey, videoId } = body;
      await this.videoService.updateEngagement(videoId, userKey, "like");
      res.status(200).json({
        status: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  @Post("/favourite")
  async saveOrRemove(@Body() body, @Res() res) {
    try {
      const { userKey, videoId } = body;
      await this.videoService.updateEngagement(videoId, userKey, "favourite");
      res.status(200).json({
        status: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
