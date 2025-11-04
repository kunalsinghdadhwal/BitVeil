use crate::circuits::{
    calculate_hamming_distance, create_circuit, empty_circuit, generate_keys, generate_proof,
    generate_setup_params, verify,
};
use halo2_proofs::{
    pasta::{EqAffine, Fp},
    plonk::keygen_vk,
    poly::commitment::Params,
};
use js_sys::Uint8Array;
use std::io::BufReader;
use wasm_bindgen::prelude::*;

// Set up panic hook for better error messages in WASM
#[wasm_bindgen(start)]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

fn copy_vec_to_uint8array(vec: &Vec<u8>) -> Uint8Array {
    let uint8_array = Uint8Array::new_with_length(vec.len() as u32);
    uint8_array.copy_from(&vec);
    uint8_array
}

#[wasm_bindgen]
pub fn setup_params(k: u32) -> Uint8Array {
    log("Generating setup parameters...");
    let params: Params<EqAffine> = generate_setup_params(k);
    let mut buf = Vec::new();
    params.write(&mut buf).expect("Failed to write params");
    copy_vec_to_uint8array(&buf)
}

#[wasm_bindgen]
pub fn proof_generate(a: &[u8], b: &[u8], params_bytes: &[u8]) -> Result<Uint8Array, JsValue> {
    log(&format!(
        "Generating proof for vectors of length {} and {}",
        a.len(),
        b.len()
    ));

    // Validate input lengths
    if a.len() != 32 || b.len() != 32 {
        error(&format!(
            "Invalid vector length: a={}, b={} (expected 32)",
            a.len(),
            b.len()
        ));
        return Err(JsValue::from_str(&format!(
            "Both vectors must be exactly 32 bits, got {} and {}",
            a.len(),
            b.len()
        )));
    }

    // Validate binary values
    for (i, &bit) in a.iter().enumerate() {
        if bit != 0 && bit != 1 {
            error(&format!(
                "Invalid bit value in vector A at position {}: {}",
                i, bit
            ));
            return Err(JsValue::from_str(&format!(
                "Vector A contains non-binary value {} at position {}",
                bit, i
            )));
        }
    }
    for (i, &bit) in b.iter().enumerate() {
        if bit != 0 && bit != 1 {
            error(&format!(
                "Invalid bit value in vector B at position {}: {}",
                i, bit
            ));
            return Err(JsValue::from_str(&format!(
                "Vector B contains non-binary value {} at position {}",
                bit, i
            )));
        }
    }

    let params = Params::<EqAffine>::read(&mut BufReader::new(params_bytes))
        .map_err(|e| JsValue::from_str(&format!("Failed to read params: {}", e)))?;

    let a_vec: Vec<u64> = a.iter().map(|x| *x as u64).collect();
    let b_vec: Vec<u64> = b.iter().map(|x| *x as u64).collect();

    log("Calculating hamming distance...");
    let hamming_distance = calculate_hamming_distance(a_vec.clone(), b_vec.clone());

    log("Generating keys...");
    let empty_circ = empty_circuit();
    let (pk, _vk) = generate_keys(&params, &empty_circ);

    log("Creating circuit...");
    let hams_circ = create_circuit(a_vec, b_vec);

    log("Generating ZK proof...");
    let proof = generate_proof(&params, &pk, hams_circ, &hamming_distance);

    log("Proof generated successfully!");
    Ok(copy_vec_to_uint8array(&proof))
}

#[wasm_bindgen]
pub fn proof_verify(params_bytes: &[u8], hamming_dist: u32, proof_bytes: &[u8]) -> bool {
    log("Verifying proof...");
    let params =
        Params::<EqAffine>::read(&mut BufReader::new(params_bytes)).expect("Failed to read params");

    let empty_circ = empty_circuit();
    let vk = keygen_vk(&params, &empty_circ).expect("Failed to generate vk");

    let hamming_dist_fp = vec![Fp::from(hamming_dist as u64)];

    let proof_vect = proof_bytes.to_vec();

    let ret_val = verify(&params, &vk, &hamming_dist_fp, proof_vect);
    match ret_val {
        Err(_) => false,
        _ => true,
    }
}
