import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOSTNAME'),
  port: configService.getOrThrow('DATABASE_PORT'),
  username: configService.getOrThrow('DATABASE_USER'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  database: configService.getOrThrow('DATABASE_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
});
