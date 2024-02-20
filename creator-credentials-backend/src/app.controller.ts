import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('.well-known/acme-challenge/:id')
  getWellKnown(@Param('id') id: string): string {
    return `${id}.${process.env.CERT_SECRET_KEY}`;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
