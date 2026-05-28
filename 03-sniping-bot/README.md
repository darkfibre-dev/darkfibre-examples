# Sniping Bot

WebSocket-based token sniper that auto-buys new PumpFun tokens.

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
3. Auto-buys newly created tokens using `quoteMint` from the create event
4. (Demo) Immediately sells back for testing
5. Reconnects with exponential backoff on disconnect

## Configuration

Edit `index.ts` to change:

- `QUOTE_AMOUNT` - Quote currency to spend per snipe (default: 0.005)
- `SLIPPAGE` - Slippage tolerance (default: 0.1 = 10%)
- `PRIORITY` - Transaction priority (default: `'fast'`)
- `MAX_SNIPES` - Maximum snipes before exit (-1 for unlimited)

The sniper passes `msg.data.quoteMint` from each create event into `sdk.buy()` and `sdk.sell()` so trades match the pool's quote currency (SOL, USDC, etc.).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DARKFIBRE_API_KEY` | Your Darkfibre API key |
| `SOLANA_PRIVATE_KEY` | Your wallet private key (base58) |

## Production Notes

The demo sells immediately after buying. For production:

1. Remove or modify the sell logic
2. Add your own filters (check token metadata, etc.)
3. Implement your exit strategy
4. Consider adding position tracking

## Related

- [SDK Documentation](https://docs.darkfibre.io/sdk/)
- [WebSocket Guide](https://docs.darkfibre.io/websocket/)
- [Subscribe Filters](https://docs.darkfibre.io/websocket/subscribe/)
