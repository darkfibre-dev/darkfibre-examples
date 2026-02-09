import { DarkfibreSDK, APIError } from '@darkfibre/sdk';
import WebSocket from 'ws';
import 'dotenv/config';

// Configuration
const SOL_AMOUNT = 0.005;             // SOL per snipe
const SLIPPAGE = 0.1;                 // 10% slippage tolerance
const PRIORITY = 'fast' as const;     // Transaction priority
const MAX_SNIPES: number = 5;         // -1 for unlimited
const WS_URL = 'wss://ws.darkfibre.dev/v1';

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

// SDK Setup
const sdk = new DarkfibreSDK({
  apiKey: DARKFIBRE_API_KEY,
  privateKey: SOLANA_PRIVATE_KEY,
});

// State
let ws: WebSocket;
let reconnectAttempt = 0;
let snipesStarted = 0;
let snipesCompleted = 0;

// Check if we should exit (all snipes started AND completed)
function checkExit() {
  if (MAX_SNIPES !== -1 && snipesStarted >= MAX_SNIPES && snipesCompleted >= snipesStarted) {
    console.log(`\n[DONE] Completed ${snipesCompleted} snipes. Exiting.`);
    ws.close();
    process.exit(0);
  }
}

// Snipe Handler
async function handleCreate(mint: string, symbol: string) {
  if (MAX_SNIPES !== -1 && snipesStarted >= MAX_SNIPES) return;
  snipesStarted++;

  const snipeNum = snipesStarted;
  console.log(`\n[SNIPE #${snipeNum}] ${symbol} (${mint})`);

  try {
    // Buy
    const buyResult = await sdk.buy({
      mint,
      solAmount: SOL_AMOUNT,
      slippage: SLIPPAGE,
      priority: PRIORITY,
    });

    console.log(`[BUY #${snipeNum}] ${buyResult.tradeResult.outputAmount} tokens`);
    console.log(`  https://solscan.io/tx/${buyResult.signature}`);

    // Demo: Wait and sell immediately (for testing only)
    // In production, replace with your exit strategy
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sellResult = await sdk.sell({
      mint,
      tokenAmount: buyResult.tradeResult.outputAmount,
      slippage: SLIPPAGE,
      priority: PRIORITY,
    });

    console.log(`[SELL #${snipeNum}] ${sellResult.tradeResult.outputAmount} SOL`);
    console.log(`  https://solscan.io/tx/${sellResult.signature}`);

  } catch (err) {
    if (err instanceof APIError) {
      console.log(`[ERROR #${snipeNum}] ${err.code}: ${err.message}`);
    } else {
      console.log(`[ERROR #${snipeNum}] ${err}`);
    }
  }

  // Mark this snipe as completed and check if we should exit
  snipesCompleted++;
  checkExit();
}

// WebSocket Connection
function connect() {
  const wsUrl = `${WS_URL}?apiKey=${DARKFIBRE_API_KEY}`;
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    reconnectAttempt = 0;

    // Subscribe to PumpFun create events
    ws.send(JSON.stringify({
      type: 'subscribe',
      filters: {
        platform: ['pump_fun'],
        eventType: ['create'],
      },
    }));

    console.log(`[WS] Connected`);
    console.log(`[WS] Listening for new tokens...`);
    console.log(`[WS] Config: ${SOL_AMOUNT} SOL | ${SLIPPAGE * 100}% slippage | ${PRIORITY} priority`);
    if (MAX_SNIPES !== -1) {
      console.log(`[WS] Will stop after ${MAX_SNIPES} snipes`);
    }
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data.toString());

    // Handle transaction events
    if (msg.type === 'transaction' && msg.data?.eventType === 'create') {
      // Skip mayhem mode tokens
      if (msg.data.isMayhemMode) return;

      handleCreate(msg.data.mint, msg.data.symbol);
    }
  };

  ws.onerror = (err) => {
    console.log('[WS] Error:', err.message);
  };

  ws.onclose = () => {
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempt++), 30000);
    console.log(`[WS] Disconnected. Reconnecting in ${delay / 1000}s...`);
    setTimeout(connect, delay);
  };
}

// Start
console.log('Starting Darkfibre Sniping Bot...\n');
connect();
