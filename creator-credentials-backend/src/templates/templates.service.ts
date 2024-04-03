import { Injectable } from '@nestjs/common';
import { ArrayContains, Repository } from 'typeorm';
import { Template } from './template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templatesRepository: Repository<Template>,
  ) {}
  getTemplate(templateName: string = 'def template'): string {
    // Implement logic to fetch the template by name
    return `This is the ${templateName} template`;
  }

  getAllTempates() {
    return this.templatesRepository.find({});
  }

  getAllTempatesOfIssuer(issuer: User) {
    return issuer.templates;
  }
}
