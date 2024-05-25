import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import 'dotenv/config'
const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

const LockModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("CertificateContract", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});

export default LockModule;