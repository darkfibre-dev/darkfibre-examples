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
2. Buys tokens with 0.005 SOL (`quoteMint: 'SOL'`)
3. Prints the transaction signature and tokens received

## Configuration

Edit `index.ts` to change:

- `TOKEN_ADDRESS` - Token mint address to buy
- `quoteAmount` - Amount of quote currency to spend
- `quoteMint` - Quote currency (`'SOL'`, `'WSOL'`, `'USDC'` or mint address)
- `slippage` - Slippage tolerance (0.05 = 5%)
- `priority` - Transaction priority (`'fast'`, `'faster'`, `'fastest'`)

## Related

- [SDK Documentation](https://docs.darkfibre.io/sdk/)
- [buy() Reference](https://docs.darkfibre.io/sdk/buy/)
