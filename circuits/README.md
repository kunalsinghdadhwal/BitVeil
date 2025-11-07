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

## Command Line Interface

BitVeil provides a comprehensive CLI for interacting with the zero-knowledge proof circuits directly from the command line.

### Building the CLI

```bash
cd circuits
cargo build --release --bin cli
```

The compiled binary will be available at `target/release/cli`.

### Available Commands

#### Setup

Initialize setup parameters and generate proving/verifying keys.

```bash
./target/x86_64-unknown-linux-gnu/release/cli setup [OPTIONS]
```

**Options:**
- `-k, --k <K>` - Power of 2 for circuit size (default: 8, meaning 2^8 = 256 rows)
- `-o, --output <OUTPUT>` - Output directory for setup files (default: ./keys)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli setup -k 8 -o ./keys
```

This generates three files:
- `params.bin` - Setup parameters
- `proving_key.bin` - Proving key
- `verifying_key.bin` - Verifying key

#### Prove

Generate a zero-knowledge proof for two binary vectors.

```bash
./target/x86_64-unknown-linux-gnu/release/cli prove [OPTIONS] --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `--vector-a <VECTOR_A>` - First binary vector (comma-separated, e.g., "1,0,1,0")
- `--vector-b <VECTOR_B>` - Second binary vector (comma-separated, e.g., "0,1,0,1")
- `-p, --params <PARAMS>` - Path to setup parameters (default: ./keys/params.bin)
- `-o, --output <OUTPUT>` - Output file for proof (default: ./proof.bin)
- `--show-distance` - Print hamming distance (default: true)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli prove \
  --vector-a "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0" \
  --vector-b "0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1" \
  -o ./my-proof.bin --params ./keys/params.bin
```

#### Verify

Verify a zero-knowledge proof.

```bash
./target/x86_64-unknown-linux-gnu/release/cli verify [OPTIONS] --distance <DISTANCE> --proof <PROOF>
```

**Options:**
- `-d, --distance <DISTANCE>` - Hamming distance to verify
- `-p, --proof <PROOF>` - Path to proof file
- `--params <PARAMS>` - Path to setup parameters (default: ./keys/params.bin)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli verify -d 16 -p ./my-proof.bin --params ./keys/params.bin
```

#### Distance

Calculate the Hamming distance between two binary vectors without generating a proof.

```bash
./target/x86_64-unknown-linux-gnu/release/cli distance --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `--vector-a <VECTOR_A>` - First binary vector (comma-separated)
- `--vector-b <VECTOR_B>` - Second binary vector (comma-separated)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli distance --vector-a "1,0,1,0" --vector-b "0,1,0,1"
```

This displays:
- Hamming distance
- Similarity percentage
- Positions where vectors differ

#### Mock Prove

Run the mock prover for testing without generating actual keys or proofs. Useful for development and debugging.

```bash
./target/x86_64-unknown-linux-gnu/release/cli mock-prove [OPTIONS] --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `--vector-a <VECTOR_A>` - First binary vector (comma-separated)
- `--vector-b <VECTOR_B>` - Second binary vector (comma-separated)
- `-k, --k <K>` - Circuit size parameter (default: 8)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli mock-prove --vector-a "1,0,1,0" --vector-b "0,1,0,1" -k 8
```

#### Draw

Generate a visual representation of the circuit layout.

```bash
./target/x86_64-unknown-linux-gnu/release/cli draw [OPTIONS]
```

**Options:**
- `-k, --k <K>` - Circuit size parameter (default: 8)
- `-o, --output <OUTPUT>` - Output file path (default: ./layout.png)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli draw -k 8 -o ./circuit-diagram.png
```

#### Example

Generate example binary vectors with a specific Hamming distance for testing.

```bash
./target/x86_64-unknown-linux-gnu/release/cli example [OPTIONS]
```

**Options:**
- `-d, --distance <DISTANCE>` - Hamming distance to generate (0-32, default: 8)

**Example:**
```bash
./target/x86_64-unknown-linux-gnu/release/cli example -d 16
```

This outputs example vectors and shows the command to prove them.

### Complete Workflow Example

```bash
# 1. Initialize setup and generate keys
./target/x86_64-unknown-linux-gnu/release/cli setup -k 8 -o ./keys

# 2. Generate example vectors
./target/x86_64-unknown-linux-gnu/release/cli example -d 12

# 3. Generate a proof
./target/x86_64-unknown-linux-gnu/release/cli prove \
  --vector-a "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
  --vector-b "1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
  -o ./proof.bin --params ./keys/params.bin

# 4. Verify the proof
./target/x86_64-unknown-linux-gnu/release/cli verify -d 12 -p ./proof.bin --params ./keys/params.bin

# 5. Calculate distance without proof (for comparison)
./target/x86_64-unknown-linux-gnu/release/cli distance \
  --vector-a "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
  --vector-b "1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
```
