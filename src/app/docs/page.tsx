"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Terminal, Code, Lock, Zap, Database, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Brutalist grid background overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 bg-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-4 border-black bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="reverse" className="border-2 border-black hover:bg-black hover:text-white font-bold">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    BACK
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black">DOCUMENTATION</h1>
                  <p className="text-sm text-black/60 font-medium">Everything you need to know about BitVeil</p>
                </div>
              </div>
              <Link href="/demo">
                <Button variant="reverse" className="border-2 border-black hover:bg-black hover:text-white font-bold">
                  TRY DEMO
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <Card className="p-6 bg-white border-4 border-black sticky top-24">
                <h3 className="text-lg font-black mb-4 uppercase tracking-wide">Contents</h3>
                <nav className="space-y-2">
                  <a href="#overview" className="block text-sm font-bold hover:underline">Overview</a>
                  <a href="#features" className="block text-sm font-bold hover:underline">Features</a>
                  <a href="#how-it-works" className="block text-sm font-bold hover:underline">How It Works</a>
                  <a href="#architecture" className="block text-sm font-bold hover:underline">Architecture</a>
                  <a href="#usage" className="block text-sm font-bold hover:underline">Usage Guide</a>
                  <a href="#cli" className="block text-sm font-bold hover:underline">CLI Reference</a>
                  <a href="#circuits" className="block text-sm font-bold hover:underline">Circuit Details</a>
                  <a href="#performance" className="block text-sm font-bold hover:underline">Performance</a>
                  <a href="#technical" className="block text-sm font-bold hover:underline">Technical Specs</a>
                </nav>
              </Card>
            </aside>

            {/* Main Documentation */}
            <div className="lg:col-span-3 space-y-8">
              {/* Overview */}
              <section id="overview">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Overview
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p className="font-medium">
                      BitVeil is a privacy-preserving zero-knowledge proof demonstration for Hamming distance calculations. 
                      Built with Halo2 ZK-SNARKs and WebAssembly, it enables you to prove the similarity between two 
                      binary vectors without revealing the vectors themselves.
                    </p>
                    <p className="font-medium">
                      All cryptographic operations run locally in your browser. No data is ever sent to any server, 
                      ensuring complete privacy and security for sensitive comparisons.
                    </p>
                    <div className="pt-4 border-t-2 border-black">
                      <h3 className="text-xl font-black mb-3 uppercase">Use Cases</h3>
                      <ul className="space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>Biometric matching (fingerprints, iris scans) without exposing biometric data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>Secure similarity comparisons for encrypted databases</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>Private set intersection protocols</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>Decentralized identity verification systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>Privacy-preserving machine learning model comparisons</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Features */}
              <section id="features">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-black bg-black/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5" />
                        <h3 className="font-black uppercase">Zero Knowledge</h3>
                      </div>
                      <p className="text-sm font-medium">
                        Prove Hamming distance without revealing input vectors. Complete privacy guaranteed.
                      </p>
                    </div>
                    <div className="p-4 border-2 border-black bg-black/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5" />
                        <h3 className="font-black uppercase">Browser-Based</h3>
                      </div>
                      <p className="text-sm font-medium">
                        All operations run locally in your browser. No server communication required.
                      </p>
                    </div>
                    <div className="p-4 border-2 border-black bg-black/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="w-5 h-5" />
                        <h3 className="font-black uppercase">WASM-Powered</h3>
                      </div>
                      <p className="text-sm font-medium">
                        High-performance Rust circuits compiled to WebAssembly for speed.
                      </p>
                    </div>
                    <div className="p-4 border-2 border-black bg-black/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5" />
                        <h3 className="font-black uppercase">Halo2 ZK-SNARKs</h3>
                      </div>
                      <p className="text-sm font-medium">
                        Industry-standard zero-knowledge proof system with Pasta curves.
                      </p>
                    </div>
                  </div>
                </Card>
              </section>

                            <section>
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Getting Started
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Installation</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-black/5 border-2 border-black font-mono text-sm">
                          git clone https://github.com/kunalsinghdadhwal/bitveil.git<br/>
                          cd bitveil<br/>
                          pnpm install
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Development</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-black/5 border-2 border-black font-mono text-sm">
                          pnpm dev
                        </div>
                        <p className="text-sm font-medium">Open http://localhost:3000 to view the application.</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Building Circuits (Optional)</h3>
                      <div className="space-y-3">
                        <p className="text-sm font-medium">
                          If you modify the Rust circuits, rebuild the WASM module:
                        </p>
                        <div className="p-4 bg-black/5 border-2 border-black font-mono text-sm">
                          cd circuits<br/>
                          wasm-pack build --target bundler<br/>
                          cp -r pkg/* ../src/lib/wasm/
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t-4 border-black">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/demo" className="flex-1">
                          <Button variant="reverse" className="w-full py-6 text-lg font-black border-2 border-black">
                            TRY THE DEMO
                          </Button>
                        </Link>
                        <a 
                          href="https://github.com/kunalsinghdadhwal/bitveil" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="reverse" className="w-full py-6 text-lg font-black border-2 border-black">
                            VIEW ON GITHUB
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
                          </section>

              {/* How It Works */}
              <section id="how-it-works">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    How It Works
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">What is Hamming Distance?</h3>
                      <p className="font-medium mb-4">
                        Hamming distance measures the number of positions at which two binary vectors differ. 
                        For example, comparing 1010 and 0011 gives a Hamming distance of 3 (three positions differ).
                      </p>
                      <div className="p-4 bg-black/5 border-2 border-black font-mono text-sm">
                        <div className="space-y-1">
                          <div>Vector A: 1 0 1 0</div>
                          <div>Vector B: 0 0 1 1</div>
                          <div className="border-t-2 border-black pt-1 mt-2">XOR:      1 0 0 1</div>
                          <div className="font-black">Distance: 2 (bits differ)</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Zero-Knowledge Proof Process</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">1</Badge>
                          <div>
                            <h4 className="font-black mb-1">Setup Parameters</h4>
                            <p className="text-sm font-medium">
                              Generate or load cryptographic parameters (k=8 by default, meaning 256 circuit rows). 
                              Cached in browser for reuse.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">2</Badge>
                          <div>
                            <h4 className="font-black mb-1">Input Vectors</h4>
                            <p className="text-sm font-medium">
                              Enter two 32-bit binary vectors. Validation ensures only 0s and 1s are accepted.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">3</Badge>
                          <div>
                            <h4 className="font-black mb-1">Circuit Creation</h4>
                            <p className="text-sm font-medium">
                              The WASM module creates a Halo2 circuit with binary constraints, XOR gates, and accumulation logic.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">4</Badge>
                          <div>
                            <h4 className="font-black mb-1">Proof Generation</h4>
                            <p className="text-sm font-medium">
                              Generate proving and verifying keys, then create a zero-knowledge proof. 
                              This takes 2-5 seconds depending on your browser.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">5</Badge>
                          <div>
                            <h4 className="font-black mb-1">Verification</h4>
                            <p className="text-sm font-medium">
                              Verify the proof against the claimed Hamming distance. Verification takes under 1 second.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Architecture */}
              <section id="architecture">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Architecture
                  </h2>
                  <div className="space-y-4">
                    <p className="font-medium">
                      BitVeil consists of two main components: a Rust-based ZK circuit library and a Next.js web application.
                    </p>
                    <div className="pt-4">
                      <h3 className="text-xl font-black mb-3 uppercase">Technology Stack</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <h4 className="font-black text-sm mb-2 uppercase">Frontend</h4>
                          <ul className="text-sm font-medium space-y-1">
                            <li>Next.js 15</li>
                            <li>React 19</li>
                            <li>TypeScript</li>
                            <li>Tailwind CSS</li>
                            <li>Radix UI</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-black text-sm mb-2 uppercase">Backend</h4>
                          <ul className="text-sm font-medium space-y-1">
                            <li>Rust (circuits)</li>
                            <li>Halo2 (ZK proofs)</li>
                            <li>Pasta Curves</li>
                            <li>WebAssembly</li>
                            <li>wasm-pack</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Usage Guide */}
              <section id="usage">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Usage Guide
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Browser Demo</h3>
                      <ol className="space-y-3 font-medium">
                        <li className="flex gap-3">
                          <span className="font-black">1.</span>
                          <span>Navigate to the demo page and wait for WASM circuits to load (indicated by a success toast)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black">2.</span>
                          <span>Enter two 32-bit binary vectors (comma or space separated) or use quick examples</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black">3.</span>
                          <span>Click "Generate ZK Proof" to create a proof (takes 2-5 seconds)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black">4.</span>
                          <span>View the Hamming distance and generated proof (Base64 encoded)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black">5.</span>
                          <span>Click "Verify Proof" to confirm the proof is valid (takes under 1 second)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black">6.</span>
                          <span>Test with different distances using the "Proof Tester" card to see failures</span>
                        </li>
                      </ol>
                    </div>

                    <div className="border-t-2 border-black pt-6">
                      <h3 className="text-xl font-black mb-3 uppercase">Example Vectors</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-black/5 border-2 border-black">
                          <h4 className="font-black text-sm mb-2 uppercase">Identical Vectors (Distance: 0)</h4>
                          <div className="font-mono text-xs space-y-1">
                            <div>A: 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0</div>
                            <div>B: 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0</div>
                          </div>
                        </div>
                        <div className="p-4 bg-black/5 border-2 border-black">
                          <h4 className="font-black text-sm mb-2 uppercase">Similar Vectors (Distance: 4)</h4>
                          <div className="font-mono text-xs space-y-1">
                            <div>A: 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0</div>
                            <div>B: 0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0</div>
                          </div>
                        </div>
                        <div className="p-4 bg-black/5 border-2 border-black">
                          <h4 className="font-black text-sm mb-2 uppercase">Opposite Vectors (Distance: 32)</h4>
                          <div className="font-mono text-xs space-y-1">
                            <div>A: 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1</div>
                            <div>B: 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* CLI Reference */}
              <section id="cli">
                <Card className="p-8 md:p-10 bg-black text-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-white pb-4">
                    <Terminal className="inline-block mr-2 w-8 h-8" />
                    CLI Reference
                  </h2>
                  <div className="space-y-6">
                    <p className="font-medium">
                      BitVeil includes a command-line interface for native proof generation and verification.
                    </p>

                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Building the CLI</h3>
                      <div className="p-4 bg-white/10 border-2 border-white font-mono text-sm">
                        cd circuits<br/>
                        cargo build --release --bin cli
                      </div>
                      <p className="text-sm font-medium mt-2">
                        Binary location: ./target/x86_64-unknown-linux-gnu/release/cli
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="setup" className="border-2 border-white">
                        <AccordionTrigger className="px-4 py-3 font-black uppercase hover:bg-white/10">
                          Setup Command
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-3">
                          <p className="text-sm font-medium">Initialize setup parameters and generate keys.</p>
                          <div className="p-3 bg-white/10 border border-white font-mono text-xs">
                            ./target/x86_64-unknown-linux-gnu/release/cli setup -k 8 -o ./keys
                          </div>
                          <div className="text-sm font-medium">
                            <p className="font-black mb-2">Options:</p>
                            <ul className="space-y-1 text-xs">
                              <li>-k, --k &lt;K&gt; - Circuit size (default: 8)</li>
                              <li>-o, --output &lt;DIR&gt; - Output directory (default: ./keys)</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="prove" className="border-2 border-white">
                        <AccordionTrigger className="px-4 py-3 font-black uppercase hover:bg-white/10">
                          Prove Command
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-3">
                          <p className="text-sm font-medium">Generate a zero-knowledge proof for two vectors.</p>
                          <div className="p-3 bg-white/10 border border-white font-mono text-xs break-all">
                            ./target/x86_64-unknown-linux-gnu/release/cli prove \<br/>
                            &nbsp;&nbsp;--vector-a "1,0,1,0,..." \<br/>
                            &nbsp;&nbsp;--vector-b "0,1,0,1,..." \<br/>
                            &nbsp;&nbsp;-o ./proof.bin
                          </div>
                          <div className="text-sm font-medium">
                            <p className="font-black mb-2">Options:</p>
                            <ul className="space-y-1 text-xs">
                              <li>--vector-a &lt;VEC&gt; - First binary vector (comma-separated)</li>
                              <li>--vector-b &lt;VEC&gt; - Second binary vector (comma-separated)</li>
                              <li>-p, --params &lt;PATH&gt; - Setup params (default: ./keys/params.bin)</li>
                              <li>-o, --output &lt;PATH&gt; - Proof output (default: ./proof.bin)</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="verify" className="border-2 border-white">
                        <AccordionTrigger className="px-4 py-3 font-black uppercase hover:bg-white/10">
                          Verify Command
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-3">
                          <p className="text-sm font-medium">Verify a zero-knowledge proof.</p>
                          <div className="p-3 bg-white/10 border border-white font-mono text-xs">
                            ./target/x86_64-unknown-linux-gnu/release/cli verify -d 16 -p ./proof.bin
                          </div>
                          <div className="text-sm font-medium">
                            <p className="font-black mb-2">Options:</p>
                            <ul className="space-y-1 text-xs">
                              <li>-d, --distance &lt;NUM&gt; - Hamming distance to verify</li>
                              <li>-p, --proof &lt;PATH&gt; - Path to proof file</li>
                              <li>--params &lt;PATH&gt; - Setup params (default: ./keys/params.bin)</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="other" className="border-2 border-white">
                        <AccordionTrigger className="px-4 py-3 font-black uppercase hover:bg-white/10">
                          Other Commands
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4">
                          <div>
                            <p className="font-black text-sm mb-2">distance</p>
                            <p className="text-xs font-medium">Calculate Hamming distance without proof generation</p>
                          </div>
                          <div>
                            <p className="font-black text-sm mb-2">mock-prove</p>
                            <p className="text-xs font-medium">Run mock prover for testing (faster, no real proof)</p>
                          </div>
                          <div>
                            <p className="font-black text-sm mb-2">draw</p>
                            <p className="text-xs font-medium">Generate circuit layout visualization (PNG)</p>
                          </div>
                          <div>
                            <p className="font-black text-sm mb-2">example</p>
                            <p className="text-xs font-medium">Generate example vectors with specific Hamming distance</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </Card>
              </section>

              {/* Circuit Details */}
              <section id="circuits">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Circuit Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black mb-3 uppercase">Circuit Architecture</h3>
                      <p className="font-medium mb-4">
                        The BitVeil circuit is built using the Halo2 proving system with three main components:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 border-2 border-black bg-black/5">
                          <h4 className="font-black mb-2">BitVeilChip</h4>
                          <p className="text-sm font-medium">
                            Main chip implementing circuit logic with binary verification, XOR computation, and accumulation.
                          </p>
                        </div>
                        <div className="p-4 border-2 border-black bg-black/5">
                          <h4 className="font-black mb-2">BitVeilConfig</h4>
                          <p className="text-sm font-medium">
                            Configuration defining circuit structure: 3 advice columns and 1 instance column.
                          </p>
                        </div>
                        <div className="p-4 border-2 border-black bg-black/5">
                          <h4 className="font-black mb-2">BitVeilCircuit</h4>
                          <p className="text-sm font-medium">
                            Complete circuit implementation with vector inputs and Hamming distance output.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-black pt-6">
                      <h3 className="text-xl font-black mb-3 uppercase">Circuit Operations</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">1</Badge>
                          <div>
                            <h4 className="font-black">Binary Verification</h4>
                            <p className="text-sm font-medium">
                              Validates that all input values are binary using the constraint: value * (1 - value) = 0
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">2</Badge>
                          <div>
                            <h4 className="font-black">XOR Computation</h4>
                            <p className="text-sm font-medium">
                              Performs bitwise XOR using the constraint: a + b - 2ab - out = 0
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">3</Badge>
                          <div>
                            <h4 className="font-black">Accumulation</h4>
                            <p className="text-sm font-medium">
                              Sums all XOR results to compute the final Hamming distance
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Badge className="bg-black text-white font-black px-3 py-1 border-2 border-black">4</Badge>
                          <div>
                            <h4 className="font-black">Public Output</h4>
                            <p className="text-sm font-medium">
                              Exposes only the Hamming distance as a public value (vectors remain private)
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="border-t-2 border-black pt-6">
                      <h3 className="text-xl font-black mb-3 uppercase">Cryptographic Details</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 border-2 border-black">
                          <p className="font-black mb-1">Proof System</p>
                          <p className="font-medium">Halo2 with Pasta curves</p>
                        </div>
                        <div className="p-3 border-2 border-black">
                          <p className="font-black mb-1">Field</p>
                          <p className="font-medium">Pallas base field (Fp)</p>
                        </div>
                        <div className="p-3 border-2 border-black">
                          <p className="font-black mb-1">Vector Length</p>
                          <p className="font-medium">32 bits</p>
                        </div>
                        <div className="p-3 border-2 border-black">
                          <p className="font-black mb-1">Transcript</p>
                          <p className="font-medium">Blake2b hash function</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Performance */}
              <section id="performance">
                <Card className="p-8 md:p-10 bg-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-black pb-4">
                    Performance
                  </h2>
                  <div className="space-y-4">
                    <p className="font-medium">
                      Performance metrics for browser-based proof generation and verification:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-6 border-4 border-black bg-black text-white text-center">
                        <div className="text-4xl font-black mb-2">2-5s</div>
                        <div className="text-sm font-bold uppercase">Proof Generation</div>
                        <div className="text-xs mt-2 opacity-80">Browser-dependent</div>
                      </div>
                      <div className="p-6 border-4 border-black bg-black text-white text-center">
                        <div className="text-4xl font-black mb-2">&lt;1s</div>
                        <div className="text-sm font-bold uppercase">Verification</div>
                        <div className="text-xs mt-2 opacity-80">Consistently fast</div>
                      </div>
                      <div className="p-6 border-4 border-black bg-black text-white text-center">
                        <div className="text-4xl font-black mb-2">2MB</div>
                        <div className="text-sm font-bold uppercase">WASM Size</div>
                        <div className="text-xs mt-2 opacity-80">First load only</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t-2 border-black">
                      <h3 className="text-lg font-black mb-3 uppercase">Optimization Features</h3>
                      <ul className="space-y-2 font-medium text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Setup parameters cached in localStorage (avoid regeneration)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>WASM module loaded once per session and cached by browser</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Proofs stored in localStorage for testing different distances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Optimized Rust compilation with release profile</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </section>


              {/* Technical Specs */}
              <section id="technical">
                <Card className="p-8 md:p-10 bg-black text-white border-4 border-black">
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-white pb-4">
                    Technical Specifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-black mb-3 uppercase border-b-2 border-white pb-2">Frontend</h3>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>Next.js 15 (App Router)</li>
                        <li>React 19</li>
                        <li>TypeScript 5</li>
                        <li>Tailwind CSS 4</li>
                        <li>Radix UI Components</li>
                        <li>Framer Motion</li>
                        <li>Sonner (Toast notifications)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-black mb-3 uppercase border-b-2 border-white pb-2">Cryptography</h3>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>Halo2 Proving System</li>
                        <li>Pasta Curves (Pallas/Vesta)</li>
                        <li>Blake2b Transcript Hash</li>
                        <li>Plonkish Arithmetization</li>
                        <li>IPA Polynomial Commitment</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-black mb-3 uppercase border-b-2 border-white pb-2">Build Tools</h3>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>Rust 1.70+</li>
                        <li>Cargo (Rust package manager)</li>
                        <li>wasm-pack 0.12+</li>
                        <li>pnpm 9</li>
                        <li>Node.js 18+</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-black mb-3 uppercase border-b-2 border-white pb-2">Dependencies</h3>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>halo2_proofs 0.3</li>
                        <li>pasta_curves 0.5</li>
                        <li>wasm-bindgen 0.2</li>
                        <li>clap 4 (CLI)</li>
                        <li>anyhow (Error handling)</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </section>

            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t-4 border-black py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm font-bold text-black/60">
                BitVeil © {new Date().getFullYear()} · Privacy-First ZK Proofs
              </p>
              <div className="flex gap-4">
                <Link href="/" className="text-sm font-bold hover:underline">
                  HOME
                </Link>
                <Link href="/demo" className="text-sm font-bold hover:underline">
                  DEMO
                </Link>
                <Link href="/docs" className="text-sm font-bold hover:underline">
                  DOCS
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
