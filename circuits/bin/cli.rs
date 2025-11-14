use anyhow::{Context, Result};
use circuits::circuits::{
    calculate_hamming_distance, create_circuit, draw_circuit, empty_circuit, generate_keys,
    generate_proof, generate_setup_params, run_mock_prover, verify,
};
use clap::{Parser, Subcommand};
use colored::Colorize;
use halo2_proofs::{
    pasta::{EqAffine, Fp},
    poly::commitment::Params,
};
use std::fs;
use std::path::PathBuf;

// Helper function to convert Fp to u64
fn fp_to_u64(fp: &Fp) -> u64 {
    // Format as hex and parse
    let hex_str = format!("{:?}", fp);
    // The debug format is "0xHEXVALUE"
    if let Some(hex) = hex_str.strip_prefix("0x") {
        // Parse the last 16 hex digits (64 bits) as little-endian
        let trimmed = if hex.len() > 16 {
            &hex[hex.len() - 16..]
        } else {
            hex
        };
        u64::from_str_radix(trimmed, 16).unwrap_or(0)
    } else {
        0
    }
}

// Helper function to load setup parameters
fn load_params(path: &PathBuf) -> Result<Params<EqAffine>> {
    let params_data =
        fs::read(path).context(format!("Failed to read params file: {}", path.display()))?;
    Params::<EqAffine>::read(&mut &params_data[..]).context("Failed to deserialize params")
}

// Helper function to save setup parameters
fn save_params(params: &Params<EqAffine>, path: &PathBuf) -> Result<()> {
    let mut buf = Vec::new();
    params
        .write(&mut buf)
        .context("Failed to serialize params")?;
    fs::write(path, buf).context(format!("Failed to write params to {}", path.display()))
}

#[derive(Parser)]
#[command(name = "bitveil")]
#[command(author = "Kunal Singh Dadhwal <kunalsinghdadhwal@gmail.com>")]
#[command(version = "0.1.0")]
#[command(about = "BitVeil - Zero-Knowledge Proof CLI for Hamming Distance", long_about = None)]
#[command(arg_required_else_help = true)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize setup parameters and generate keys
    Setup {
        /// Power of 2 for circuit size (k value, e.g., 8 means 2^8 = 256 rows)
        #[arg(short, long, default_value_t = 8)]
        k: u32,

        /// Output directory for setup files
        #[arg(short, long, default_value = "./keys")]
        output: PathBuf,
    },

    /// Generate a zero-knowledge proof
    Prove {
        /// First binary vector (comma-separated, e.g., "1,0,1,0")
        #[arg(short, long)]
        vector_a: String,

        /// Second binary vector (comma-separated, e.g., "0,1,0,1")
        #[arg(short = 'b', long)]
        vector_b: String,

        /// Path to setup parameters
        #[arg(short, long, default_value = "./keys/params.bin")]
        params: PathBuf,

        /// Path to proving key
        #[arg(short = 'k', long, default_value = "./keys/proving_key.bin")]
        proving_key: PathBuf,

        /// Output file for proof
        #[arg(short, long, default_value = "./proof.bin")]
        output: PathBuf,

        /// Print hamming distance
        #[arg(long, default_value_t = true)]
        show_distance: bool,
    },

    /// Verify a zero-knowledge proof
    Verify {
        /// Hamming distance to verify
        #[arg(short, long)]
        distance: u64,

        /// Path to proof file
        #[arg(short, long)]
        proof: PathBuf,

        /// Path to setup parameters
        #[arg(short = 'p', long, default_value = "./keys/params.bin")]
        params: PathBuf,

        /// Path to verifying key
        #[arg(short = 'k', long, default_value = "./keys/verifying_key.bin")]
        verifying_key: PathBuf,
    },

    /// Calculate Hamming distance between two binary vectors (no ZK proof)
    Distance {
        /// First binary vector (comma-separated, e.g., "1,0,1,0")
        #[arg(short, long)]
        vector_a: String,

        /// Second binary vector (comma-separated, e.g., "0,1,0,1")
        #[arg(short = 'b', long)]
        vector_b: String,
    },

    /// Run mock prover for testing (no actual proof generation)
    MockProve {
        /// First binary vector (comma-separated)
        #[arg(short, long)]
        vector_a: String,

        /// Second binary vector (comma-separated)
        #[arg(short = 'b', long)]
        vector_b: String,

        /// Circuit size parameter (k)
        #[arg(short, long, default_value_t = 8)]
        k: u32,
    },

    /// Draw circuit layout (generates layout.png)
    Draw {
        /// Circuit size parameter (k)
        #[arg(short, long, default_value_t = 8)]
        k: u32,

        /// Output file path
        #[arg(short, long, default_value = "./layout.png")]
        output: PathBuf,
    },

    /// Generate example vectors for testing
    Example {
        /// Hamming distance to generate (0-32)
        #[arg(short, long, default_value_t = 8)]
        distance: usize,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Setup { k, output }) => {
            println!("Initializing BitVeil setup (k={})", k);
            println!("Output directory: {}", output.display());

            // Create output directory
            fs::create_dir_all(output).context("Failed to create output directory")?;

            // Generate setup parameters
            println!("Generating setup parameters...");
            let params = generate_setup_params(*k);

            // Generate keys
            println!("Generating proving and verifying keys...");
            let circuit = empty_circuit();
            let (_pk, _vk) = generate_keys(&params, &circuit);

            // Note: Keys cannot be serialized in halo2_proofs 0.3.1
            // They will be regenerated from params when needed
            println!("Saving setup parameters...");

            // Save params
            let params_path = output.join("params.bin");
            save_params(&params, &params_path)?;

            println!("{}", "Setup complete!".green().bold());
            println!("  Parameters: {}", params_path.display());
            println!("  Note: Keys will be regenerated from params when needed");
        }

        Some(Commands::Prove {
            vector_a,
            vector_b,
            params: params_path,
            proving_key: _,
            output,
            show_distance,
        }) => {
            println!("Generating zero-knowledge proof...");

            // Parse vectors
            let a = parse_binary_vector(vector_a)?;
            let b = parse_binary_vector(vector_b)?;

            if a.len() != b.len() {
                anyhow::bail!("Vectors must be the same length");
            }

            println!("Vector A: {:?}", a);
            println!("Vector B: {:?}", b);

            // Calculate hamming distance
            let hamming_distance = calculate_hamming_distance(a.clone(), b.clone());
            if *show_distance {
                let distance_u64 = fp_to_u64(&hamming_distance[0]);
                println!("Hamming Distance: {}", distance_u64);
            }

            // Create circuit
            let circuit = create_circuit(a, b);

            // Load params and generate keys
            println!("Loading setup parameters...");
            let params = load_params(params_path)?;
            println!("Generating keys from params...");
            let (pk, _vk) = generate_keys(&params, &empty_circuit());

            // Generate proof
            let proof = generate_proof(&params, &pk, circuit, &hamming_distance);

            // Save proof
            fs::write(output, &proof).context("Failed to write proof file")?;

            let distance_u64 = fp_to_u64(&hamming_distance[0]);

            println!("{}", "Proof generated successfully!".green().bold());
            println!("  Proof saved to: {}", output.display());
            println!("  Hamming Distance: {}", distance_u64);
            println!("  Proof size: {} bytes", proof.len());
        }

        Some(Commands::Verify {
            distance,
            proof,
            params: params_path,
            verifying_key: _,
        }) => {
            println!("Verifying zero-knowledge proof...");

            // Read proof
            let proof_bytes = fs::read(proof).context("Failed to read proof file")?;

            println!("Claimed Hamming Distance: {}", distance);
            println!("Proof size: {} bytes", proof_bytes.len());

            // Create public input
            let pub_input = vec![Fp::from(*distance)];

            // Load params and generate keys
            println!("Loading setup parameters...");
            let params = load_params(params_path)?;
            println!("Generating keys from params...");
            let (_pk, vk) = generate_keys(&params, &empty_circuit());

            // Verify proof
            match verify(&params, &vk, &pub_input, proof_bytes) {
                Ok(_) => {
                    println!("{}", "Proof verified successfully!".green().bold());
                }
                Err(_) => {
                    println!("{}", "Proof verification failed!".red().bold());
                    std::process::exit(1);
                }
            }
        }

        Some(Commands::Distance { vector_a, vector_b }) => {
            println!("Calculating Hamming Distance...");

            let a = parse_binary_vector(vector_a)?;
            let b = parse_binary_vector(vector_b)?;

            if a.len() != b.len() {
                anyhow::bail!("Vectors must be the same length");
            }

            println!("Vector A: {:?}", a);
            println!("Vector B: {:?}", b);

            let hamming_distance = calculate_hamming_distance(a.clone(), b.clone());
            let diff_positions: Vec<usize> = a
                .iter()
                .zip(&b)
                .enumerate()
                .filter(|(_, (x, y))| *x != *y)
                .map(|(i, _)| i)
                .collect();

            let distance_u64 = fp_to_u64(&hamming_distance[0]);

            println!("\nResults:");
            println!("  Hamming Distance: {}", distance_u64);
            println!(
                "  Similarity: {:.2}%",
                (1.0 - (distance_u64 as f64 / a.len() as f64)) * 100.0
            );
            println!("  Differing positions: {:?}", diff_positions);
        }

        Some(Commands::MockProve {
            vector_a,
            vector_b,
            k,
        }) => {
            println!("Running mock prover...");

            let a = parse_binary_vector(vector_a)?;
            let b = parse_binary_vector(vector_b)?;

            if a.len() != b.len() {
                anyhow::bail!("Vectors must be the same length");
            }

            println!("Vector A: {:?}", a);
            println!("Vector B: {:?}", b);

            let hamming_distance = calculate_hamming_distance(a.clone(), b.clone());
            let distance_u64 = fp_to_u64(&hamming_distance[0]);
            println!("Hamming Distance: {}", distance_u64);

            let circuit = create_circuit(a, b);
            run_mock_prover(*k, &circuit, &hamming_distance);
        }

        Some(Commands::Draw { k, output }) => {
            println!("Drawing circuit layout...");

            let circuit = empty_circuit();
            draw_circuit(*k, &circuit);

            // Move the file if a different output is specified
            if output.file_name().unwrap() != "layout.png" {
                fs::rename("layout.png", output).context("Failed to move layout file")?;
                println!("{}", "Circuit layout saved successfully!".green().bold());
                println!("  Output: {}", output.display());
            } else {
                println!("{}", "Circuit layout saved successfully!".green().bold());
                println!("  Output: layout.png");
            }
        }

        Some(Commands::Example { distance }) => {
            if *distance > 32 {
                anyhow::bail!("Distance must be between 0 and 32");
            }

            println!(
                "Generating example vectors with Hamming distance = {}",
                distance
            );

            // Generate vector A (all zeros for simplicity)
            let vector_a: Vec<u64> = vec![0; 32];

            // Generate vector B with exactly 'distance' bits set to 1
            let mut vector_b: Vec<u64> = vec![0; 32];
            for i in 0..*distance {
                vector_b[i] = 1;
            }

            println!("\nExample vectors:");
            println!(
                "  Vector A: {}",
                vector_a
                    .iter()
                    .map(|x| x.to_string())
                    .collect::<Vec<_>>()
                    .join(",")
            );
            println!(
                "  Vector B: {}",
                vector_b
                    .iter()
                    .map(|x| x.to_string())
                    .collect::<Vec<_>>()
                    .join(",")
            );
            println!("\nUsage:");
            println!(
                "  ./target/x86_64-unknown-linux-gnu/release/cli prove --vector-a \"{}\" --vector-b \"{}\"",
                vector_a
                    .iter()
                    .map(|x| x.to_string())
                    .collect::<Vec<_>>()
                    .join(","),
                vector_b
                    .iter()
                    .map(|x| x.to_string())
                    .collect::<Vec<_>>()
                    .join(",")
            );
        }

        None => {
            println!("Use --help for usage information");
        }
    }

    Ok(())
}

fn parse_binary_vector(input: &str) -> Result<Vec<u64>> {
    input
        .split(',')
        .map(|s| {
            let trimmed = s.trim();
            let num = trimmed.parse::<u64>().with_context(|| {
                format!(
                    "{}",
                    format!("Invalid input: '{}' is not a valid number", trimmed).red()
                )
            })?;
            if num != 0 && num != 1 {
                anyhow::bail!(
                    "{}",
                    format!("Invalid input: '{}' must be 0 or 1", num).red()
                );
            }
            Ok(num)
        })
        .collect()
}
