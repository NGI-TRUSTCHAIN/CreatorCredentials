import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { AuthGuard } from 'src/users/guards/clerk-user.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { ClerkRole, User } from 'src/users/user.entity';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
  readonly;
  @UseGuards(AuthGuard)
  @Get('creator')
  async getCreatorsWithFilter(@GetUser() user: User) {
    if (user.clerkRole !== ClerkRole.Creator) {
      throw new NotFoundException('This api is only for Creator.');
    }

    const templates = await this.templatesService.getAllTempates();
    return {
      templates,
    };
  }

  @UseGuards(AuthGuard)
  @Get('issuer')
  async getTemplatesOfIssuer(@GetUser() user: User) {
    if (user.clerkRole !== ClerkRole.Issuer) {
      throw new NotFoundException('This api is only for Issuer.');
    }

    const templates = await this.templatesService.getAllTempatesOfIssuer(user);
    return {
      templates,
    };
  }
}
