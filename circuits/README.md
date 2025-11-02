# BitVeil Circuits

## Overview

This library implements zero-knowledge proof circuits using the Halo2 proving system for privacy-preserving Hamming distance calculations. The circuit enables users to prove the Hamming distance between two private binary vectors without revealing the vectors themselves.

## What is Hamming Distance?

Hamming distance measures the number of positions at which two binary vectors differ. It is commonly used in cryptography, error detection, and similarity comparisons.

## Circuit Architecture

The BitVeil circuit is built using the Halo2 proving system with the following components:

### Core Components

- **BitVeilChip**: The main chip that implements the circuit logic
- **BitVeilConfig**: Configuration defining the circuit structure with 3 advice columns and 1 instance column
- **BitVeilCircuit**: The complete circuit implementation

### Circuit Operations

1. **Binary Verification**: Validates that all input values are binary (0 or 1)
2. **XOR Computation**: Performs bitwise XOR operations between corresponding elements of two private vectors
3. **Accumulation**: Sums the XOR results to compute the Hamming distance
4. **Public Output**: Exposes the final Hamming distance as a public value

### Gates

- **Binary Gates**: Constrain input values to be either 0 or 1
- **XOR Gate**: Implements the constraint `(a + b - 2ab - out) = 0`
- **Accumulator Gate**: Sums all XOR results into a single value

## Features

- Support for 32-bit binary vectors
- Zero-knowledge proofs that preserve input privacy
- WebAssembly compilation support for browser integration
- Mock prover for testing and development
- Proof generation and verification functions

## Building

### Native Build

```bash
cargo build --release
```

### WebAssembly Build

#### Using Cargo

```bash
cargo build --lib --release --target wasm32-unknown-unknown
```

#### Using wasm-pack

For browser integration with bundlers (webpack, vite, etc.):

```bash
# For bundlers (recommended)
wasm-pack build --target bundler

# For web (ES modules)
wasm-pack build --target web

# For Node.js
wasm-pack build --target nodejs

# For no-modules (vanilla JS)
wasm-pack build --target no-modules
```

The wasm-pack output will be generated in the `pkg/` directory and includes TypeScript definitions for easy integration.

## Usage

The library provides several key functions:

- `create_circuit(a, b)`: Creates a circuit from two binary vectors
- `generate_setup_params(k)`: Generates setup parameters
- `generate_keys(params, circuit)`: Generates proving and verifying keys
- `calculate_hamming_distance(a, b)`: Calculates the expected Hamming distance
- `generate_proof(params, pk, circuit, pub_input)`: Generates a zero-knowledge proof
- `verify(params, vk, pub_input, proof)`: Verifies a proof

## Technical Details

- **Proof System**: Halo2 with Pasta curves
- **Field**: Pallas base field (Fp)
- **Vector Length**: 32 bits
- **Transcript**: Blake2b hash function
