import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as Certificate from '@/services/blockchain/artifacts/contracts/Certificate.sol/CertificateContract.json';
import { ConfigService } from '@nestjs/config';

const contractABI = Certificate.abi;

const fetchContract = (
  API_URL: string,
  PRIVATE_KEY: string,
  CONTRACT_ADDRESS: string,
) => {
  const provider = new ethers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

@Injectable()
export class CertificateService {
  private contractInstance: ethers.Contract;

  constructor(private readonly configService: ConfigService) {
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    const ApiUrl = this.configService.get<string>('API_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const contractInstance = fetchContract(ApiUrl, privateKey, contractAddress);
    this.contractInstance = contractInstance;
  }
  async getCertificate(userId: string, courseId: string) {
    const certificate = await this.contractInstance.getCertificate(
      userId,
      courseId,
    );
    return {
      userId: certificate[0],
      courseId: certificate[1],
      completedPoint: certificate[2],
      timestamp: Number(certificate[3]) * 1000,
    };
  }
  createCertificate(userId: string, courseId: string, completedPoint: string) {
    return this.contractInstance.addCertificate(
      userId,
      courseId,
      completedPoint,
    );
  }
}
