import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FooterSection() {
  return (
    <footer className="px-4 py-12 md:py-16 bg-white border-t-4 border-black">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="font-medium text-black/70">Built with Next.js, Shadcn/UI, WASM, and Halo2 cryptography.</p>
            <Link
              href="https://github.com/kunalsinghdadhwal/bitveil"
              className="inline-block text-black font-black border-b-4 border-black hover:bg-black hover:text-white px-1 transition-all"
            >
              Open-source on GitHub
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-black">
            <Badge className="bg-black text-white border-2 border-black font-bold px-3 py-1">HALO2</Badge>
            <Badge className="bg-white text-black border-2 border-black font-bold px-3 py-1">PRIVACY</Badge>
            <Badge className="bg-black text-white border-2 border-black font-bold px-3 py-1">ZK PROOF</Badge>
            <Badge className="bg-white text-black border-2 border-black font-bold px-3 py-1">WASM</Badge>
          </div>

          <p className="text-xs text-black/50 font-mono">
            © 2025 BitVeil Circuits. No tracking. No cookies. Only math.
          </p>
        </div>
      </div>
    </footer>
  )
}
