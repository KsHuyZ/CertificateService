import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const mainService = configService.get<string>('MAIN_SERVICES');
  app.enableCors({
    origin: mainService,
  });
  await app.listen(port);
}
bootstrap();
