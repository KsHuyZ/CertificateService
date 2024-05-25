type ConfigProps = {
  port: number;
  contractAddress: string;
  mainService: string;
  privateKey: string;
  apiUrl: string;
};

export const config = (): ConfigProps => ({
  port: Number(process.env.PORT) ?? 3000,
  contractAddress:
    process.env.CONTRACT_ADDRESS ??
    '0x862A3eDB62793a0425c3539a67A40f766DaB0375',
  mainService: process.env.MAIN_SERVICES ?? 'http://localhost:8080',
  privateKey:
    process.env.PRIVATE_KEY ??
    '780999a084b8673834d7e8288c49ea1df52def69ea0890641f0a973a97b22d73',
  apiUrl:
    process.env.API_URL ??
    'https://eth-sepolia.g.alchemy.com/v2/BQPDhhfUYCjqSTdJ3kNbTW1xJv322I_G',
});
