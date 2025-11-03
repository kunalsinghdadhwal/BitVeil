import HeroSection from "@/components/hero-section"
import QuickDemoSection from "@/components/quick-demo-section"
import FeaturesSection from "@/components/features-section"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "BitVeil Circuits – Zero-Knowledge Proof Privacy Demo",
  description:
    "Prove Hamming distance privately with ZK. WASM-powered browser demo for secure binary vector similarity.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Skip to content link for a11y */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Brutalist grid background overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 bg-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div id="main-content" className="relative z-10">
        <HeroSection />
        <QuickDemoSection />
        <FeaturesSection />
        <FooterSection />
      </div>
    </main>
  )
}
