import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative px-4 py-12 md:py-20 border-b-4 border-black">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="max-w-6xl mx-auto">
        <Card className="p-12 md:p-20 bg-white border-4 border-black shadow-lg">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              PROVE HAMMING
              <br />
              DISTANCE PRIVATELY
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-black/70 border-l-4 border-black pl-6">
              BitVeil Circuits: WASM-powered zero-knowledge proof demo for secure binary vector similarity
            </h2>

            <p className="text-lg md:text-base leading-relaxed text-black/60 max-w-2xl mx-auto font-medium">
              Generate zero-knowledge proofs for 32-bit vectors directly in your browser. Perfect for developers
              building privacy-first applications like decentralized ID matching and fuzzy comparison.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/demo" className="w-full sm:w-auto">
                <Button
                  className="w-full px-8 py-6 text-lg font-black bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all"
                  aria-label="Try Full Demo"
                >
                  TRY DEMO <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs" className="w-full sm:w-auto">
                <Button
                  variant="neutral"
                  className="w-full px-8 py-6 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all bg-transparent"
                  aria-label="Read Documentation"
                >
                  READ DOCS
                </Button>
              </Link>
            </div>

            {/* Demo GIF Placeholder */}
            <div className="pt-8 border-t-4 border-black">
              <img
                src="/image.svg?height=300&width=500"
                alt="Flow diagram: Input vectors → Generate proof → Verify privately"
                className="w-full max-w-md mx-auto border-4 border-black"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
