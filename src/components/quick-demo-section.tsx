"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Copy, Check, Loader2 } from "lucide-react"

export default function QuickDemoSection() {
  const [vectorA, setVectorA] = useState("")
  const [vectorB, setVectorB] = useState("")
  const [loading, setLoading] = useState(false)
  const [distance, setDistance] = useState<number | null>(null)
  const [proof, setProof] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string>("")

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

    if (!validateVector(vectorA) || !validateVector(vectorB)) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const bitsA = vectorA
      .trim()
      .split(/[,\s]+/)
      .map(Number)
    const bitsB = vectorB
      .trim()
      .split(/[,\s]+/)
      .map(Number)
    const hammingDist = bitsA.reduce((sum, bit, i) => sum + (bit !== bitsB[i] ? 1 : 0), 0)

    setDistance(hammingDist)
    setProof(`proof_halo2_${Buffer.from(vectorA).toString("base64").slice(0, 12)}`)
    setLoading(false)
  }

  const copyProof = () => {
    if (proof) {
      navigator.clipboard.writeText(proof)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="px-4 py-16 md:py-24 border-b-4 border-black bg-black/2">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h3 className="text-4xl md:text-5xl font-black mb-4">QUICK START</h3>
          <p className="text-lg text-black/60 font-medium">Try it here: Input two 32-bit vectors</p>
        </div>

        <Card className="p-10 md:p-12 bg-white border-4 border-black space-y-8">
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
              {error && (
                <p className="text-red-600 text-xs font-bold mt-2" role="alert">
                  {error}
                </p>
              )}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-black bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 transition-all uppercase tracking-wide"
              aria-label={loading ? "Computing proof..." : "Compute Hamming Distance"}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  COMPUTING...
                </>
              ) : (
                "COMPUTE HAMMING DISTANCE & PROOF"
              )}
            </Button>
          </form>

          {/* Results */}
          {distance !== null && proof && (
            <div className="border-t-4 border-black pt-8 space-y-4" role="status" aria-live="polite">
              <div className="flex items-center gap-3">
                <Badge className="bg-black text-white text-base px-4 py-2 font-mono font-bold">
                  DISTANCE: {distance}
                </Badge>
                <span className="text-sm text-black/60 font-medium">out of 32 bits differ</span>
              </div>

              <div className="bg-black/5 p-4 border-2 border-black">
                <p className="text-xs font-black uppercase mb-2 tracking-wide">Proof Output:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-xs text-black/70 break-all">{proof}</code>
                  <button
                    onClick={copyProof}
                    className="flex-shrink-0 p-2 hover:bg-black hover:text-white transition-all border border-black"
                    aria-label="Copy proof"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <p className="text-xs text-black/50 font-mono mt-4">
          Max 32&nbsp;bits · Trim spaces automatically · No server logs
        </p>
      </div>
    </section>
  )
}
