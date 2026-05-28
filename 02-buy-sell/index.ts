import { DarkfibreSDK, APIError, ValidationError, SigningError } from '@darkfibre/sdk';
import 'dotenv/config';

// Configuration
const MINT = 'YOUR_TOKEN_MINT_HERE';  // Token to trade
const QUOTE_AMOUNT = 0.005;            // Quote amount to spend on buy
const QUOTE_MINT = 'SOL' as const;     // Quote currency (SOL, WSOL, USDC)
const SLIPPAGE = 0.05;                // 5% slippage tolerance
const PRIORITY = 'fast' as const;     // Transaction priority

// Validate Environment
const { DARKFIBRE_API_KEY, SOLANA_PRIVATE_KEY } = process.env;

if (!DARKFIBRE_API_KEY) {
  console.error('Missing DARKFIBRE_API_KEY in .env');
  process.exit(1);
}

if (!SOLANA_PRIVATE_KEY) {
  console.error('Missing SOLANA_PRIVATE_KEY in .env');
  process.exit(1);
}

// Main
const sdk = new DarkfibreSDK({
  apiKey: DARKFIBRE_API_KEY,
  privateKey: SOLANA_PRIVATE_KEY,
});

try {
  // Buy
  console.log(`\n[BUY] Buying tokens with ${QUOTE_AMOUNT} ${QUOTE_MINT}...`);

  const buyResult = await sdk.buy({
    mint: MINT,
    quoteAmount: QUOTE_AMOUNT,
    quoteMint: QUOTE_MINT,
    slippage: SLIPPAGE,
    priority: PRIORITY,
  });

  console.log(`[BUY] Success!`);
  console.log(`  Tokens received: ${buyResult.tradeResult.outputAmount}`);
  console.log(`  SOL spent: ${buyResult.tradeResult.inputAmount}`);
  console.log(`  Priority fee: ${buyResult.priorityCost} SOL`);
  console.log(`  https://solscan.io/tx/${buyResult.signature}`);

  // Wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Sell
  console.log(`\n[SELL] Selling ${buyResult.tradeResult.outputAmount} tokens...`);

  const sellResult = await sdk.sell({
    mint: MINT,
    tokenAmount: buyResult.tradeResult.outputAmount,
    quoteMint: QUOTE_MINT,
    slippage: SLIPPAGE,
    priority: PRIORITY,
  });

  console.log(`[SELL] Success!`);
  console.log(`  Tokens sold: ${sellResult.tradeResult.inputAmount}`);
  console.log(`  SOL received: ${sellResult.tradeResult.outputAmount}`);
  console.log(`  Priority fee: ${sellResult.priorityCost} SOL`);
  console.log(`  https://solscan.io/tx/${sellResult.signature}`);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`\n[ERROR] Validation: ${error.message}`);
    if (error.field) {
      console.error(`  Field: ${error.field}`);
    }
  } else if (error instanceof SigningError) {
    console.error(`\n[ERROR] Signing: ${error.message}`);
    console.error('  Check that your private key is valid and in base58 format.');
  } else if (error instanceof APIError) {
    console.error(`\n[ERROR] API [${error.code}]: ${error.message}`);
  } else {
    throw error;
  }
  process.exit(1);
}
