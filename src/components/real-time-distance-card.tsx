"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"

interface RealTimeDistanceCardProps {
  vectorA: string
  vectorB: string
}

export default function RealTimeDistanceCard({ vectorA, vectorB }: RealTimeDistanceCardProps) {
  const [distance, setDistance] = useState<number | null>(null)
  const [similarity, setSimilarity] = useState<number | null>(null)

  useEffect(() => {
    const calculateDistance = () => {
      const trimmedA = vectorA.trim()
      const trimmedB = vectorB.trim()
      
      const bitsA = trimmedA.split(/[,\s]+/).filter(Boolean)
      const bitsB = trimmedB.split(/[,\s]+/).filter(Boolean)

      // Only calculate if both vectors are valid length
      if (bitsA.length === 32 && bitsB.length === 32) {
        const hammingDistance = bitsA.reduce(
          (sum, bit, i) => sum + (bit !== bitsB[i] ? 1 : 0),
          0
        )
        const similarityPercent = ((32 - hammingDistance) / 32) * 100
        setDistance(hammingDistance)
        setSimilarity(similarityPercent)
      } else {
        setDistance(null)
        setSimilarity(null)
      }
    }

    calculateDistance()
  }, [vectorA, vectorB])

  if (distance === null || similarity === null) {
    return null
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-5 h-5" />
        <h4 className="text-lg font-black uppercase tracking-wide">Real-Time Analysis</h4>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase text-black/60">Hamming Distance:</span>
          <Badge variant="default" className="text-lg px-4 py-2 font-mono font-bold">
            {distance} / 32
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase text-black/60">Similarity:</span>
          <Badge 
            variant="default"
            className={`text-lg px-4 py-2 font-mono font-bold ${
              similarity >= 80 
                ? 'bg-green-500 text-white' 
                : similarity >= 50 
                ? 'bg-yellow-500 text-black' 
                : 'bg-red-500 text-white'
            }`}
          >
            {similarity.toFixed(1)}%
          </Badge>
        </div>

        {/* Visual bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-black/60">
            <span>DIFFERENT</span>
            <span>IDENTICAL</span>
          </div>
          <div className="h-4 bg-secondary-background border-2 border-border relative overflow-hidden">
            <div 
              className="h-full bg-main transition-all duration-300"
              style={{ width: `${similarity}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono font-bold">
            <span>{distance} bits differ</span>
            <span>{32 - distance} bits match</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
