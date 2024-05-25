import { Body, Controller, Get, Post } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private certificate: CertificateService) {}
  @Get('/get-certificate')
  getCertificate(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.certificate.getCertificate(userId, courseId);
  }

  @Post('/create-certificate')
  createCertificate(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('completedPoint') completedPoint: string,
  ) {
    return this.certificate.createCertificate(userId, courseId, completedPoint);
  }
}
