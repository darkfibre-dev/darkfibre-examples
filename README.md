# Darkfibre SDK Examples

Complete examples using the official [@darkfibre/sdk](https://www.npmjs.com/package/@darkfibre/sdk) npm package.

## Prerequisites

- Node.js 20+
- Darkfibre API key ([register here](https://darkfibre.dev/register))
- Solana wallet private key (base58)

## Examples

### 1. [Quick Start](./01-quick-start/)

Quick start example: buy tokens using the SDK.

```bash
cd 01-quick-start
npm install
cp .env.example .env
# Edit .env with your credentials
# Edit index.ts to set the mint address of the token you want to trade
npm start
```

### 2. [Buy + Sell](./02-buy-sell/)

Complete buy/sell cycle with detailed logging and error handling.

```bash
cd 02-buy-sell
npm install
cp .env.example .env
# Edit .env with your credentials
# Edit index.ts to set the mint address of the token you want to trade
npm start
```

### 3. [Sniping Bot](./03-sniping-bot/)

WebSocket listener that auto-buys new PumpFun tokens.

```bash
cd 03-sniping-bot
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

## Documentation

- [SDK Documentation](https://docs.darkfibre.dev/sdk/)
- [API Reference](https://docs.darkfibre.dev/api/)
- [WebSocket Guide](https://docs.darkfibre.dev/websocket/)

## Support

- [Discord](https://discord.gg/B4ERE25JsG)
- [Documentation](https://docs.darkfibre.dev)
