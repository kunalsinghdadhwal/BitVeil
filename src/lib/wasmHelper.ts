import init, { setup_params, proof_generate, proof_verify } from './wasm/circuits';
// @ts-ignore - WASM file import
import wasmUrl from './wasm/circuits_bg.wasm';

let wasmInitialized = false;
let cachedParams: Uint8Array | null = null;

// LocalStorage keys
const STORAGE_KEYS = {
    SETUP_PARAMS: 'bitveil_setup_params',
    SETUP_PARAMS_K: 'bitveil_setup_params_k',
    LAST_PROOF: 'bitveil_last_proof',
    LAST_PROOF_DISTANCE: 'bitveil_last_proof_distance',
} as const;

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
        // Try to load from localStorage first
        const storedK = localStorage.getItem(STORAGE_KEYS.SETUP_PARAMS_K);
        const storedParams = localStorage.getItem(STORAGE_KEYS.SETUP_PARAMS);
        
        if (storedK === k.toString() && storedParams) {
            try {
                cachedParams = base64ToUint8Array(storedParams);
                console.log(`Loaded setup parameters from localStorage (k=${k})`);
                return cachedParams;
            } catch (error) {
                console.warn('Failed to load setup params from localStorage:', error);
            }
        }

        console.log(`Generating setup parameters with k=${k} (${2 ** k} rows)...`);
        cachedParams = setup_params(k);
        console.log('Setup parameters generated successfully');
        
        // Store in localStorage
        try {
            localStorage.setItem(STORAGE_KEYS.SETUP_PARAMS, uint8ArrayToBase64(cachedParams));
            localStorage.setItem(STORAGE_KEYS.SETUP_PARAMS_K, k.toString());
            console.log('Setup parameters saved to localStorage');
        } catch (error) {
            console.warn('Failed to save setup params to localStorage:', error);
        }
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
        
        // Store proof in localStorage
        try {
            localStorage.setItem(STORAGE_KEYS.LAST_PROOF, uint8ArrayToBase64(proof));
            localStorage.setItem(STORAGE_KEYS.LAST_PROOF_DISTANCE, hammingDistance.toString());
            console.log('Proof saved to localStorage');
        } catch (error) {
            console.warn('Failed to save proof to localStorage:', error);
        }
        
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

// Base64 encoding/decoding utilities
export function uint8ArrayToBase64(arr: Uint8Array): string {
    // Convert Uint8Array to binary string
    let binary = '';
    const len = arr.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(arr[i]);
    }
    // Use btoa for base64 encoding
    return btoa(binary);
}

export function base64ToUint8Array(base64: string): Uint8Array {
    // Decode base64 to binary string
    const binary = atob(base64);
    const len = binary.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binary.charCodeAt(i);
    }
    return arr;
}

// Hex encoding/decoding utilities (kept for backward compatibility)
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

// Helper to load last proof from localStorage
export function getLastProofFromStorage(): { proof: Uint8Array; hammingDistance: number } | null {
    try {
        const proofBase64 = localStorage.getItem(STORAGE_KEYS.LAST_PROOF);
        const distanceStr = localStorage.getItem(STORAGE_KEYS.LAST_PROOF_DISTANCE);
        
        if (proofBase64 && distanceStr) {
            const proof = base64ToUint8Array(proofBase64);
            const hammingDistance = parseInt(distanceStr, 10);
            return { proof, hammingDistance };
        }
    } catch (error) {
        console.warn('Failed to load proof from localStorage:', error);
    }
    return null;
}

// Helper to clear stored data
export function clearStoredData() {
    try {
        localStorage.removeItem(STORAGE_KEYS.SETUP_PARAMS);
        localStorage.removeItem(STORAGE_KEYS.SETUP_PARAMS_K);
        localStorage.removeItem(STORAGE_KEYS.LAST_PROOF);
        localStorage.removeItem(STORAGE_KEYS.LAST_PROOF_DISTANCE);
        cachedParams = null;
        console.log('Cleared all stored ZK data');
    } catch (error) {
        console.warn('Failed to clear stored data:', error);
    }
}
