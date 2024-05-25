import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiGuardMiddleware implements NestMiddleware {
  private mainService: string;
  constructor(private readonly configService: ConfigService) {
    const mainService = this.configService.get<string>('MAIN_SERVICES');
    this.mainService = mainService;
  }
  use(req: Request, res: Response, next: NextFunction) {
    const allowedService = this.mainService;

    if (req.headers.origin !== allowedService) {
      throw new UnauthorizedException('Not allowed to access this API');
    }
    next();
  }
}
