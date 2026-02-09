# Quick Start

Minimal example demonstrating basic SDK usage: buy tokens with SOL.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your API key and private key
# Edit index.ts to set the mint address of the token you want to trade
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

1. Initializes the SDK with your credentials
2. Buys tokens with 0.01 SOL
3. Prints the transaction signature and tokens received

## Configuration

Edit `index.ts` to change:

- `MINT` - Token mint address to buy
- `SOL_AMOUNT` - Amount of SOL to spend
- `SLIPPAGE` - Slippage tolerance (0.05 = 5%)
- `PRIORITY` - Transaction priority (`'fast'`, `'faster'`, `'fastest'`)

## Related

- [SDK Documentation](https://docs.darkfibre.io/sdk/)
- [buy() Reference](https://docs.darkfibre.io/sdk/buy/)
