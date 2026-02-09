import { DarkfibreSDK } from '@darkfibre/sdk';
import 'dotenv/config';

async function main() {
  const sdk = new DarkfibreSDK({
    apiKey: process.env.DARKFIBRE_API_KEY!,
    privateKey: process.env.SOLANA_PRIVATE_KEY!,
  });

  // Replace with the token address you want to buy
  const TOKEN_ADDRESS = 'PASTE_YOUR_TOKEN_ADDRESS_HERE';

  const result = await sdk.buy({
    mint: TOKEN_ADDRESS,
    solAmount: 0.005,
    slippage: 0.05,
    priority: 'fast',
  });

  console.log('Transaction:', result.signature);
  console.log('SOL spent:', result.tradeResult.inputAmount);
  console.log('Tokens received:', result.tradeResult.outputAmount);
  console.log('Priority fee:', result.priorityCost, 'SOL');
  console.log(`View on Solscan: https://solscan.io/tx/${result.signature}`);
}

main().catch(console.error);