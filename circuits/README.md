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
bitveil setup [OPTIONS]
```

**Options:**
- `-k, --k <K>` - Power of 2 for circuit size (default: 8, meaning 2^8 = 256 rows)
- `-o, --output <OUTPUT>` - Output directory for setup files (default: ./bitveil-keys)

**Example:**
```bash
bitveil setup -k 8 -o ./keys
```

This generates three files:
- `params.bin` - Setup parameters
- `proving_key.bin` - Proving key
- `verifying_key.bin` - Verifying key

#### Prove

Generate a zero-knowledge proof for two binary vectors.

```bash
bitveil prove [OPTIONS] --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `-a, --vector-a <VECTOR_A>` - First binary vector (comma-separated, e.g., "1,0,1,0")
- `-b, --vector-b <VECTOR_B>` - Second binary vector (comma-separated, e.g., "0,1,0,1")
- `-p, --params <PARAMS>` - Path to setup parameters (default: ./bitveil-keys/params.bin)
- `-k, --proving-key <PROVING_KEY>` - Path to proving key (default: ./bitveil-keys/proving_key.bin)
- `-o, --output <OUTPUT>` - Output file for proof (default: ./proof.bin)
- `--show-distance` - Print hamming distance (default: true)

**Example:**
```bash
bitveil prove -a "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0" \
              -b "0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1" \
              -o ./my-proof.bin
```

#### Verify

Verify a zero-knowledge proof.

```bash
bitveil verify [OPTIONS] --distance <DISTANCE> --proof <PROOF>
```

**Options:**
- `-d, --distance <DISTANCE>` - Hamming distance to verify
- `-p, --proof <PROOF>` - Path to proof file
- `--params <PARAMS>` - Path to setup parameters (default: ./bitveil-keys/params.bin)
- `-k, --verifying-key <VERIFYING_KEY>` - Path to verifying key (default: ./bitveil-keys/verifying_key.bin)

**Example:**
```bash
bitveil verify -d 16 -p ./my-proof.bin
```

#### Distance

Calculate the Hamming distance between two binary vectors without generating a proof.

```bash
bitveil distance --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `-a, --vector-a <VECTOR_A>` - First binary vector (comma-separated)
- `-b, --vector-b <VECTOR_B>` - Second binary vector (comma-separated)

**Example:**
```bash
bitveil distance -a "1,0,1,0" -b "0,1,0,1"
```

This displays:
- Hamming distance
- Similarity percentage
- Positions where vectors differ

#### Mock Prove

Run the mock prover for testing without generating actual keys or proofs. Useful for development and debugging.

```bash
bitveil mock-prove [OPTIONS] --vector-a <VECTOR_A> --vector-b <VECTOR_B>
```

**Options:**
- `-a, --vector-a <VECTOR_A>` - First binary vector (comma-separated)
- `-b, --vector-b <VECTOR_B>` - Second binary vector (comma-separated)
- `-k, --k <K>` - Circuit size parameter (default: 8)

**Example:**
```bash
bitveil mock-prove -a "1,0,1,0" -b "0,1,0,1" -k 8
```

#### Draw

Generate a visual representation of the circuit layout.

```bash
bitveil draw [OPTIONS]
```

**Options:**
- `-k, --k <K>` - Circuit size parameter (default: 8)
- `-o, --output <OUTPUT>` - Output file path (default: ./layout.png)

**Example:**
```bash
bitveil draw -k 8 -o ./circuit-diagram.png
```

#### Example

Generate example binary vectors with a specific Hamming distance for testing.

```bash
bitveil example [OPTIONS]
```

**Options:**
- `-d, --distance <DISTANCE>` - Hamming distance to generate (0-32, default: 8)

**Example:**
```bash
bitveil example -d 16
```

This outputs example vectors and shows the command to prove them.

### Complete Workflow Example

```bash
# 1. Initialize setup and generate keys
bitveil setup -k 8 -o ./keys

# 2. Generate example vectors
bitveil example -d 12

# 3. Generate a proof
bitveil prove -a "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
              -b "1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
              -o ./proof.bin

# 4. Verify the proof
bitveil verify -d 12 -p ./proof.bin

# 5. Calculate distance without proof (for comparison)
bitveil distance -a "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" \
                 -b "1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
```
