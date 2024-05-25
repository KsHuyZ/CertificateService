import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import 'dotenv/config'

const CertificateModule = buildModule("CertificateModule", (m) => {
  const lock = m.contract("CertificateContract");

  return { lock };
});

export default CertificateModule;
