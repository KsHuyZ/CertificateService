import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CertificateModule } from './certificate/certificate.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CertificateModule,
  ],
})
export class AppModule {}
