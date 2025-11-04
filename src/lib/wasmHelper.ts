import init, { setup_params, proof_generate, proof_verify } from './wasm/circuits';
// @ts-ignore - WASM file import
import wasmUrl from './wasm/circuits_bg.wasm';

let wasmInitialized = false;
let cachedParams: Uint8Array | null = null;

export async function initializeWasm() {
    if (!wasmInitialized) {
        // Initialize with the WASM file
        await init(wasmUrl);
        wasmInitialized = true;
        console.log('WASM initialized successfully');
    }
}

export async function getSetupParams(k: number = 8): Promise<Uint8Array> {
    await initializeWasm();

    if (!cachedParams) {
        console.log(`Generating setup parameters with k=${k} (${2 ** k} rows)...`);
        cachedParams = setup_params(k);
        console.log('Setup parameters generated successfully');
    }

    return cachedParams;
}

export async function generateProof(
    vectorA: number[],
    vectorB: number[]
): Promise<{ proof: Uint8Array; hammingDistance: number }> {
    await initializeWasm();

    // Validate inputs
    if (vectorA.length !== 32 || vectorB.length !== 32) {
        throw new Error(`Vectors must be exactly 32 bits. Got ${vectorA.length} and ${vectorB.length}`);
    }

    // Validate binary values
    if (!vectorA.every(bit => bit === 0 || bit === 1)) {
        throw new Error('Vector A must contain only 0s and 1s');
    }
    if (!vectorB.every(bit => bit === 0 || bit === 1)) {
        throw new Error('Vector B must contain only 0s and 1s');
    }

    // Calculate Hamming distance
    const hammingDistance = vectorA.reduce(
        (sum, bit, i) => sum + (bit !== vectorB[i] ? 1 : 0),
        0 as number
    );

    // Get setup parameters
    const params = await getSetupParams();

    // Convert to Uint8Array
    const a = new Uint8Array(vectorA);
    const b = new Uint8Array(vectorB);

    // Generate proof - now returns Result<Uint8Array, JsValue>
    console.log('Generating zero-knowledge proof...');
    try {
        const proof = proof_generate(a, b, params);
        return { proof, hammingDistance };
    } catch (error) {
        console.error('Proof generation failed:', error);
        throw new Error(`Failed to generate proof: ${error}`);
    }
}

export async function verifyProof(
    hammingDistance: number,
    proof: Uint8Array
): Promise<boolean> {
    await initializeWasm();

    // Get setup parameters
    const params = await getSetupParams();

    // Verify proof
    console.log('Verifying zero-knowledge proof...');
    const isValid = proof_verify(params, hammingDistance, proof);

    return isValid;
}

export function uint8ArrayToHex(arr: Uint8Array): string {
    return Array.from(arr)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export function hexToUint8Array(hex: string): Uint8Array {
    const matches = hex.match(/.{1,2}/g);
    if (!matches) return new Uint8Array();
    return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
}
