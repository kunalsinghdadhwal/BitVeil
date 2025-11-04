import { useState, useEffect } from 'react';
import init, { setup_params, proof_generate, proof_verify } from './wasm/circuits';

type WasmModule = {
    setup_params: typeof setup_params;
    proof_generate: typeof proof_generate;
    proof_verify: typeof proof_verify;
};

export function useWasm() {
    const [wasm, setWasm] = useState<WasmModule | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadWasm() {
            try {
                // Initialize the WASM module
                await init();

                if (mounted) {
                    setWasm({
                        setup_params,
                        proof_generate,
                        proof_verify,
                    });
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load WASM:', err);
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load WASM module');
                    setLoading(false);
                }
            }
        }

        loadWasm();

        return () => {
            mounted = false;
        };
    }, []);

    return { wasm, loading, error };
}
