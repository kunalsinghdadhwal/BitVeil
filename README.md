# BitVeil

A privacy-preserving zero-knowledge proof demonstration for Hamming distance calculations. Built with Halo2 ZK-SNARKs and WebAssembly for in-browser proof generation and verification.

## Overview

BitVeil demonstrates how zero-knowledge proofs can be used to prove the Hamming distance between two private binary vectors without revealing the vectors themselves. This is useful for privacy-preserving applications like:

- Biometric matching (fingerprints, iris scans)
- Secure similarity comparisons
- Private set intersection
- Decentralized identity verification

## Features

- **Browser-Based**: All cryptographic operations run locally in your browser
- **Zero-Knowledge**: Prove Hamming distance without revealing input vectors
- **WASM-Powered**: High-performance Rust circuits compiled to WebAssembly
- **Halo2 ZK-SNARKs**: Industry-standard zero-knowledge proof system
- **32-bit Vectors**: Support for binary vectors up to 32 bits

## Architecture

```
circuits/          - Rust ZK circuits (Halo2)
src/
  ├── components/  - React UI components
  ├── lib/         - WASM integration and utilities
  │   └── wasm/    - Compiled WASM modules
  └── app/         - Next.js app structure
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Rust and wasm-pack (for rebuilding circuits)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building Circuits (Optional)

If you modify the circuits:

```bash
cd circuits

# Build for WebAssembly
wasm-pack build --target bundler

# Copy output to Next.js project
cp -r pkg/* ../src/lib/wasm/
```

## Usage

1. **Input Vectors**: Enter two 32-bit binary vectors (comma or space-separated)
2. **Generate Proof**: Click "Compute Hamming Distance & Proof" to generate a ZK proof
3. **Verify**: Verify the proof to confirm the Hamming distance is correct
4. **Privacy**: The proof reveals only the distance, not the input vectors

### Example Vectors

```
Vector A: 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0
Vector B: 0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0
Hamming Distance: 8
```

## Technology Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **ZK Circuits**: Halo2, Rust, Pasta Curves
- **Build**: wasm-pack, WebAssembly
- **UI**: Radix UI, Lucide Icons

## Circuit Details

The BitVeil circuit implements:

1. **Binary Verification**: Constrains inputs to be 0 or 1
2. **XOR Computation**: Bitwise XOR between vector elements
3. **Accumulation**: Sums XOR results for Hamming distance
4. **Public Output**: Exposes only the final distance

See [circuits/README.md](circuits/README.md) for detailed circuit documentation.

## Performance

- **Proof Generation**: ~2-5 seconds (browser-dependent)
- **Verification**: <1 second
- **WASM Size**: ~2MB (first load, cached thereafter)

## Development

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## License

See [LICENSE](LICENSE) files in respective directories.

## Learn More

- [Halo2 Documentation](https://zcash.github.io/halo2/)
- [Zero-Knowledge Proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof)
- [Hamming Distance](https://en.wikipedia.org/wiki/Hamming_distance)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

Built with Halo2 by the ZCash Foundation and Electric Coin Company.
