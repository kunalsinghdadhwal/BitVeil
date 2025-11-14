import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, XIcon } from "lucide-react"
import Link from "next/link"
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog"

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
                  variant="reverse"
                  className="w-full px-8 py-6 text-lg font-black"
                  aria-label="Try Full Demo"
                >
                  TRY DEMO <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs" className="w-full sm:w-auto">
                <Button
                  variant="reverse"
                  className="w-full px-8 py-6 text-lg font-black"
                  aria-label="Read Documentation"
                >
                  READ DOCS
                </Button>
              </Link>
            </div>

            {/* Demo GIF Placeholder */}
            <div className="pt-8 border-t-4 border-black">
              <MorphingDialog
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <MorphingDialogTrigger>
                  <MorphingDialogImage
                    src="/image.svg"
                    alt="Flow diagram: Input vectors → Generate proof → Verify privately"
                    className="w-full max-w-2xl mx-auto h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative">
                    <MorphingDialogImage
                      src="/image.svg"
                      alt="Flow diagram: Input vectors → Generate proof → Verify privately - Expanded view"
                      className="h-auto w-full max-w-[90vw] rounded-md object-contain lg:h-[90vh]"
                    />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white border-2 border-black p-1 shadow-md hover:bg-black hover:text-white transition-colors"
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <XIcon className="h-5 w-5" />
                  </MorphingDialogClose>
                </MorphingDialogContainer>
              </MorphingDialog>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
