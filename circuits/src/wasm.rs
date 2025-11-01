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

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
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
pub fn proof_generate(a: &[u8], b: &[u8], params_bytes: &[u8]) -> Uint8Array {
    log("Generating proof...");
    let params =
        Params::<EqAffine>::read(&mut BufReader::new(params_bytes)).expect("Failed to read params");

    let a_vec: Vec<u64> = a.to_vec().iter().map(|x| *x as u64).collect();
    let b_vec: Vec<u64> = b.to_vec().iter().map(|x| *x as u64).collect();
    let hamming_distance = calculate_hamming_distance(a_vec.clone(), b_vec.clone());

    let empty_circ = empty_circuit();
    let (pk, _vk) = generate_keys(&params, &empty_circ);

    let hams_circ = create_circuit(a_vec, b_vec);
    let proof = generate_proof(&params, &pk, hams_circ, &hamming_distance);
    copy_vec_to_uint8array(&proof)
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
