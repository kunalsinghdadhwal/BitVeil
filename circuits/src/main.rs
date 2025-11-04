#[cfg(not(target_family = "wasm"))]
fn main() {
    use circuits::circuits::{
        calculate_hamming_distance, create_circuit, draw_circuit, empty_circuit, generate_keys,
        generate_proof, generate_setup_params, run_mock_prover, verify,
    };

    // Size of the circuit. Circuit must fit within 2^k rows.
    // k=8 provides 256 rows which is sufficient for this circuit
    let k = 8;

    // Input values to generate a proof with (must be 32 bits for the circuit)
    let a_vec: Vec<u64> = vec![
        1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
        1, 0,
    ];
    let b_vec: Vec<u64> = vec![
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        1, 0,
    ];

    println!("Vector A: {:?}", a_vec);
    println!("Vector B: {:?}", b_vec);

    let hamming_dist = calculate_hamming_distance(a_vec.clone(), b_vec.clone());
    println!("Hamming distance: {:?}", hamming_dist);

    // Create circuit
    let bitveil_circuit = create_circuit(a_vec, b_vec);

    // Items that are useful for debugging issues
    println!("\nDrawing circuit layout...");
    draw_circuit(k, &bitveil_circuit);

    println!("\nRunning mock prover...");
    run_mock_prover(k, &bitveil_circuit, &hamming_dist);

    // Generate setup params
    println!("\nGenerating setup parameters...");
    let params = generate_setup_params(k);

    // Generate proving and verifying keys
    println!("Generating proving and verifying keys...");
    let empty_circuit = empty_circuit();
    let (pk, vk) = generate_keys(&params, &empty_circuit);

    // Generate proof
    println!("Generating zero-knowledge proof...");
    let proof = generate_proof(&params, &pk, bitveil_circuit, &hamming_dist);
    println!("Proof size: {} bytes", proof.len());

    // Verify proof
    println!("Verifying proof...");
    let verify = verify(&params, &vk, &hamming_dist, proof);
    println!("Verification result: {:?}", verify);

    if verify.is_ok() {
        println!("\n✓ SUCCESS: Proof verified correctly!");
    } else {
        println!("\n✗ FAILED: Proof verification failed!");
    }
}
