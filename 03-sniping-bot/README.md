# Sniping Bot

WebSocket-based token sniper that auto-buys new PumpFun token creates.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your API key, private key, and WebSocket URL
```

## Run

```bash
npm start
```
or
```bash
tsx index.ts
```

## What It Does

1. Connects to the Darkfibre WebSocket feed
2. Subscribes to PumpFun `create` events
3. Auto-buys newly created tokens
4. (Demo) Immediately sells back for testing
5. Reconnects with exponential backoff on disconnect

## Configuration

Edit `index.ts` to change:

- `SOL_AMOUNT` - SOL to spend per snipe (default: 0.002)
- `SLIPPAGE` - Slippage tolerance (default: 0.1 = 10%)
- `PRIORITY` - Transaction priority (default: `'fast'`)
- `MAX_SNIPES` - Maximum snipes before exit (-1 for unlimited)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DARKFIBRE_API_KEY` | Your Darkfibre API key |
| `SOLANA_PRIVATE_KEY` | Your wallet private key (base58) |
| `WS_URL` | WebSocket URL (`wss://ws.darkfibre.dev/v1`) |

## Production Notes

The demo sells immediately after buying. For production:

1. Remove or modify the sell logic
2. Add your own filters (check token metadata, liquidity, etc.)
3. Implement your exit strategy
4. Consider adding position tracking

## Related

- [SDK Documentation](https://docs.darkfibre.io/sdk/)
- [WebSocket Guide](https://docs.darkfibre.io/websocket/)
- [Subscribe Filters](https://docs.darkfibre.io/websocket/subscribe/)
