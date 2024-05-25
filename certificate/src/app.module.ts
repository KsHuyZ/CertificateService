import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CertificateModule } from './certificate/certificate.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { ApiGuardMiddleware } from './middleware/apiMiddleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CertificateModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiGuardMiddleware).forRoutes('*');
  }
}
