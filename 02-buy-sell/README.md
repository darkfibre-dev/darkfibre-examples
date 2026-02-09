# Buy + Sell

Complete buy/sell cycle with detailed logging and comprehensive error handling.

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
2. Buys tokens with SOL
3. Waits 1 second
4. Sells all tokens back for SOL
5. Prints detailed transaction info with Solscan links

## Configuration

Edit `index.ts` to change:

- `MINT` - Token mint address to trade
- `SOL_AMOUNT` - Amount of SOL to spend on buy
- `SLIPPAGE` - Slippage tolerance (0.05 = 5%)
- `PRIORITY` - Transaction priority (`'fast'`, `'faster'`, `'fastest'`)

## Error Handling

This example demonstrates handling all SDK error types:

- `APIError` - API failures (auth, validation, insufficient funds)
- `ValidationError` - Trade limit exceeded (maxPriceImpact, maxPriorityCost)
- `SigningError` - Transaction signing failures

## Related

- [SDK Documentation](https://docs.darkfibre.dev/sdk/)
- [buy() Reference](https://docs.darkfibre.dev/sdk/buy/)
- [sell() Reference](https://docs.darkfibre.dev/sdk/sell/)
- [Error Handling](https://docs.darkfibre.dev/sdk/error-handling/)
