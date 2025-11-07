"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TestTube2, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { verifyProof } from "@/lib/wasmHelper"
import { toast } from "sonner"

interface ProofTesterCardProps {
  proof: Uint8Array | null
  actualDistance: number | null
}

export default function ProofTesterCard({ proof, actualDistance }: ProofTesterCardProps) {
  const [testDistance, setTestDistance] = useState("")
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ distance: number; valid: boolean } | null>(null)
  const [error, setError] = useState("")

  const handleTest = async () => {
    if (!proof) {
      setError("No proof available to test")
      toast.error("No proof available to test")
      return
    }

    const distance = parseInt(testDistance, 10)
    if (isNaN(distance) || distance < 0 || distance > 32) {
      setError("Distance must be a number between 0 and 32")
      toast.error("Distance must be a number between 0 and 32")
      return
    }

    setTesting(true)
    setError("")
    setTestResult(null)
    toast.loading(`Testing proof with distance ${distance}...`)

    try {
      const isValid = await verifyProof(distance, proof)
      setTestResult({ distance, valid: isValid })
      toast.dismiss()
      if (isValid) {
        toast.success(`✓ Proof verified for distance ${distance}`)
      } else {
        toast.error(`✗ Proof rejected for distance ${distance}`)
      }
    } catch (err) {
      console.error("Verification failed:", err)
      setError(err instanceof Error ? err.message : "Failed to verify proof")
      toast.dismiss()
      toast.error(err instanceof Error ? err.message : "Failed to verify proof")
    } finally {
      setTesting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTest()
    }
  }

  if (!proof) {
    return (
      <Card className="p-6 opacity-50">
        <div className="flex items-center gap-3 mb-2">
          <TestTube2 className="w-5 h-5" />
          <h4 className="text-lg font-black uppercase tracking-wide">Proof Tester</h4>
        </div>
        <p className="text-sm font-medium">
          Generate a proof first to test different distance values
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <TestTube2 className="w-5 h-5" />
        <h4 className="text-lg font-black uppercase tracking-wide">Proof Tester</h4>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-black/60 mb-3">
            Test if the proof is valid for different distance values. Only the actual distance ({actualDistance}) should verify successfully.
          </p>

          <div className="flex gap-2">
            <Input
              type="number"
              min="0"
              max="32"
              placeholder="Enter distance (0-32)"
              value={testDistance}
              onChange={(e) => {
                setTestDistance(e.target.value)
                setError("")
                setTestResult(null)
              }}
              onKeyPress={handleKeyPress}
              className="flex-1 font-mono border-2 border-black focus:border-4 focus:outline-none"
              disabled={testing}
            />
            <Button
              onClick={handleTest}
              disabled={testing || !testDistance}
              className="px-6 font-black bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 uppercase"
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Testing
                </>
              ) : (
                "Test"
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border-2 border-red-600 text-red-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}
        </div>

        {testResult && (
          <div
            className={`p-4 border-2 ${
              testResult.valid
                ? "bg-green-50 border-green-600"
                : "bg-red-50 border-red-600"
            }`}
          >
            <div className="flex items-start gap-3">
              {testResult.valid ? (
                <CheckCircle2 className="w-5 h-5 text-green-900 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-900 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-black text-sm ${testResult.valid ? "text-green-900" : "text-red-900"}`}>
                    {testResult.valid ? "PROOF VERIFIED ✓" : "PROOF REJECTED ✗"}
                  </span>
                  <Badge className={`font-mono text-xs ${testResult.valid ? "bg-green-900" : "bg-red-900"} text-white`}>
                    Distance = {testResult.distance}
                  </Badge>
                </div>
                <p className={`text-xs font-medium ${testResult.valid ? "text-green-800" : "text-red-800"}`}>
                  {testResult.valid
                    ? testResult.distance === actualDistance
                      ? "This is the correct distance! The proof validates successfully."
                      : "Unexpected: Proof verified for incorrect distance (should not happen)."
                    : testResult.distance === actualDistance
                    ? "Unexpected: Proof rejected for correct distance (should not happen)."
                    : "As expected, the proof does not verify for this distance value."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick test suggestions */}
        {actualDistance !== null && !testResult && (
          <div className="border-t-2 border-black pt-4">
            <p className="text-xs font-black uppercase text-black/60 mb-2">Quick Tests:</p>
            <div className="flex flex-wrap gap-2">
              {[0, Math.floor(actualDistance / 2), actualDistance - 1, actualDistance, actualDistance + 1, 32].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setTestDistance(dist.toString())}
                  className={`px-3 py-1 text-xs font-bold border-2 border-black transition-all ${
                    dist === actualDistance
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black/10"
                  }`}
                  disabled={dist < 0 || dist > 32}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
