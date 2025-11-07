"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Copy, Check, Loader2, CheckCircle2, XCircle, ArrowLeft, Shuffle, Trash2 } from "lucide-react"
import { generateProof, verifyProof, uint8ArrayToBase64, clearStoredData } from "@/lib/wasmHelper"
import RealTimeDistanceCard from "@/components/real-time-distance-card"
import ProofTesterCard from "@/components/proof-tester-card"
import { toast } from "sonner"

export default function DemoPage() {
  const [vectorA, setVectorA] = useState("")
  const [vectorB, setVectorB] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [distance, setDistance] = useState<number | null>(null)
  const [proof, setProof] = useState<string | null>(null)
  const [proofBytes, setProofBytes] = useState<Uint8Array | null>(null)
  const [verified, setVerified] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string>("")
  const [wasmReady, setWasmReady] = useState(false)

  useEffect(() => {
    // Preload WASM module
    import("@/lib/wasmHelper").then(() => {
      setWasmReady(true)
      console.log("WASM module loaded successfully")
      toast.success("ZK Circuits loaded successfully!")
    }).catch(err => {
      console.error("Failed to load WASM:", err)
      setError("Failed to initialize ZK circuits")
      toast.error("Failed to initialize ZK circuits")
    })
  }, [])

  const validateVector = (vec: string): boolean => {
    const trimmed = vec.trim()
    const bits = trimmed.split(/[,\s]+/).filter(Boolean)
    if (bits.length !== 32) {
      setError(`Vector must be exactly 32 bits (got ${bits.length})`)
      return false
    }
    if (!bits.every((bit) => bit === "0" || bit === "1")) {
      setError("Vector must contain only 0s and 1s")
      return false
    }
    return true
  }

  const handleCompute = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setDistance(null)
    setProof(null)
    setProofBytes(null)
    setVerified(null)

    if (!wasmReady) {
      setError("ZK circuits are still loading, please wait...")
      toast.error("ZK circuits are still loading, please wait...")
      return
    }

    if (!validateVector(vectorA) || !validateVector(vectorB)) return

    setLoading(true)

    // Use promise toast for proof generation
    const proofPromise = (async () => {
      const bitsA = vectorA
        .trim()
        .split(/[,\s]+/)
        .map(Number)
      const bitsB = vectorB
        .trim()
        .split(/[,\s]+/)
        .map(Number)

      // Generate proof using actual ZK circuits
      const { proof: proofData, hammingDistance } = await generateProof(bitsA, bitsB)
      
      const proofBase64 = uint8ArrayToBase64(proofData)
      
      setDistance(hammingDistance)
      setProof(proofBase64)
      setProofBytes(proofData)
      
      return { hammingDistance }
    })()

    toast.promise(proofPromise, {
      loading: "Generating zero-knowledge proof...",
      success: (data) => `Proof generated! Hamming distance: ${data.hammingDistance}`,
      error: (err) => err instanceof Error ? err.message : "Failed to generate proof",
    })

    try {
      await proofPromise
    } catch (err) {
      console.error("Proof generation failed:", err)
      setError(err instanceof Error ? err.message : "Failed to generate proof")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!distance || !proofBytes) return

    setVerifying(true)
    setError("")

    // Use promise toast for verification
    const verifyPromise = (async () => {
      const isValid = await verifyProof(distance, proofBytes)
      setVerified(isValid)
      return isValid
    })()

    toast.promise(verifyPromise, {
      loading: "Verifying zero-knowledge proof...",
      success: (isValid) => isValid ? "Proof verified successfully! ✓" : "Proof verification failed",
      error: (err) => err instanceof Error ? err.message : "Failed to verify proof",
    })

    try {
      await verifyPromise
    } catch (err) {
      console.error("Proof verification failed:", err)
      setError(err instanceof Error ? err.message : "Failed to verify proof")
      setVerified(false)
    } finally {
      setVerifying(false)
    }
  }

  const generateRandomVector = () => {
    const bits = Array.from({ length: 32 }, () => Math.random() > 0.5 ? 1 : 0)
    return bits.join(",")
  }

  const loadExample = (type: 'identical' | 'similar' | 'different' | 'opposite' | 'random') => {
    let vecA = ""
    let vecB = ""

    switch (type) {
      case 'identical':
        vecA = "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0"
        vecB = vecA
        break
      case 'similar':
        // 4 bits different (12.5% difference)
        vecA = "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0"
        vecB = "0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0"
        break
      case 'different':
        // 16 bits different (50% difference)
        vecA = "1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0"
        vecB = "0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0"
        break
      case 'opposite':
        vecA = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1"
        vecB = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        break
      case 'random':
        vecA = generateRandomVector()
        vecB = generateRandomVector()
        break
    }

    setVectorA(vecA)
    setVectorB(vecB)
    setError("")
    setDistance(null)
    setProof(null)
    setProofBytes(null)
    setVerified(null)
  }

  const clearAll = () => {
    setVectorA("")
    setVectorB("")
    setError("")
    setDistance(null)
    setProof(null)
    setProofBytes(null)
    setVerified(null)
  }

  const handleClearStorage = () => {
    clearStoredData()
    toast.success("Cleared all stored ZK data from localStorage")
  }

  const copyProof = () => {
    if (proof) {
      navigator.clipboard.writeText(proof)
      setCopied(true)
      toast.success("Proof copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

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
                  <h1 className="text-3xl md:text-4xl font-black">BITVEIL DEMO</h1>
                  <p className="text-sm text-black/60 font-medium">Advanced Zero-Knowledge Proof Testing</p>
                </div>
              </div>
              <Button
                onClick={handleClearStorage}
                variant="reverse"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                CLEAR STORAGE
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Example Presets */}
          <div className="mb-8">
            <h3 className="text-lg font-black mb-4 uppercase tracking-wide">Quick Examples</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => loadExample('identical')}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold"
              >
                Identical (0 diff)
              </Button>
              <Button
                onClick={() => loadExample('similar')}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold"
              >
                Similar (4 diff)
              </Button>
              <Button
                onClick={() => loadExample('different')}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold"
              >
                Different (16 diff)
              </Button>
              <Button
                onClick={() => loadExample('opposite')}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold"
              >
                Opposite (32 diff)
              </Button>
              <Button
                onClick={() => loadExample('random')}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold"
              >
                <Shuffle className="mr-2 w-4 h-4" />
                Random
              </Button>
              <Button
                onClick={clearAll}
                variant="reverse"
                className="border-2 border-black hover:bg-black hover:text-white font-bold ml-auto"
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 md:p-10 bg-white border-4 border-black">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-wide">Input Vectors</h2>
                
                <form onSubmit={handleCompute} className="space-y-6">
                  {/* Vector A Input */}
                  <div>
                    <label htmlFor="vector-a" className="block text-sm font-black mb-2 uppercase tracking-wide">
                      Vector A
                    </label>
                    <Input
                      id="vector-a"
                      type="text"
                      placeholder="e.g., 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0"
                      value={vectorA}
                      onChange={(e) => {
                        setVectorA(e.target.value)
                        setError("")
                      }}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full px-4 py-3 font-mono text-sm border-2 border-black focus:border-4 focus:outline-none"
                      aria-label="Vector A (32 bits)"
                      aria-invalid={error ? "true" : "false"}
                      disabled={loading}
                    />
                  </div>

                  {/* Vector B Input */}
                  <div>
                    <label htmlFor="vector-b" className="block text-sm font-black mb-2 uppercase tracking-wide">
                      Vector B
                    </label>
                    <Input
                      id="vector-b"
                      type="text"
                      placeholder="e.g., 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0"
                      value={vectorB}
                      onChange={(e) => {
                        setVectorB(e.target.value)
                        setError("")
                      }}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full px-4 py-3 font-mono text-sm border-2 border-black focus:border-4 focus:outline-none"
                      aria-label="Vector B (32 bits)"
                      aria-invalid={error ? "true" : "false"}
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border-2 border-red-600">
                      <p className="text-red-900 text-sm font-bold">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading || !wasmReady}
                    variant="reverse"
                    size="lg"
                    className="w-full py-6 text-lg font-black uppercase tracking-wide"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        GENERATING PROOF...
                      </>
                    ) : !wasmReady ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        LOADING ZK CIRCUITS...
                      </>
                    ) : (
                      "GENERATE ZK PROOF"
                    )}
                  </Button>
                </form>
              </Card>

              {/* Results */}
              {distance !== null && proof && (
                <Card className="p-8 md:p-10 bg-white border-4 border-black space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-wide">Proof Results</h2>
                  
                  <div className="flex items-center gap-3">
                    <Badge className="bg-black text-white text-base px-4 py-2 font-mono font-bold">
                      DISTANCE: {distance}
                    </Badge>
                    <span className="text-sm text-black/60 font-medium">out of 32 bits differ</span>
                  </div>

                  <div className="bg-black/5 p-4 border-2 border-black">
                    <p className="text-xs font-black uppercase mb-2 tracking-wide">Zero-Knowledge Proof (Base64):</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-xs text-black/70 break-all max-h-32 overflow-auto">
                        {proof}
                      </code>
                      <button
                        onClick={copyProof}
                        className="shrink-0 p-2 hover:bg-black hover:text-white transition-all border border-black"
                        aria-label="Copy proof"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Verify Button */}
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={handleVerify}
                      disabled={verifying}
                      variant="reverse"
                      size="lg"
                      className="w-full py-4 text-base font-black uppercase tracking-wide"
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          VERIFYING PROOF...
                        </>
                      ) : (
                        "VERIFY PROOF"
                      )}
                    </Button>

                    {/* Verification Result */}
                    {verified !== null && (
                      <div
                        className={`flex items-center gap-2 p-4 border-2 ${
                          verified
                            ? "bg-green-50 border-green-600 text-green-900"
                            : "bg-red-50 border-red-600 text-red-900"
                        }`}
                      >
                        {verified ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-bold">PROOF VERIFIED ✓</span>
                            <span className="text-sm ml-auto">Valid ZK proof</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            <span className="font-bold">VERIFICATION FAILED ✗</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Analysis */}
            <div className="space-y-6">
              {/* Real-time Distance */}
              {vectorA && vectorB && (
                <RealTimeDistanceCard vectorA={vectorA} vectorB={vectorB} />
              )}

              {/* Proof Tester */}
              <ProofTesterCard proof={proofBytes} actualDistance={distance} />

              {/* Info Card */}
              <Card className="p-6 bg-black text-white border-4 border-black">
                <h3 className="text-lg font-black mb-4 uppercase tracking-wide">How It Works</h3>
                <ul className="space-y-3 text-sm font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1.</span>
                    <span>Enter two 32-bit binary vectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2.</span>
                    <span>Generate a zero-knowledge proof of their Hamming distance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3.</span>
                    <span>Verify the proof without revealing the vectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4.</span>
                    <span>Test different distances to see that only the correct one verifies</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t-2 border-white/20">
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    All computation happens in your browser using Halo2 ZK-SNARKs compiled to WebAssembly. 
                    No data is sent to any server.
                  </p>
                </div>
              </Card>
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
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
