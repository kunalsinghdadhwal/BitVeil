import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      title: "BROWSER-NATIVE ZK",
      description: "Halo2 circuits compiled to WASM. All proofs generated client-side nothing leaves your machine.",
      details: "Uses proven Halo2 cryptographic primitives with zero server-side computation required.",
    },
    {
      title: "TWO-TAB WORKFLOW",
      description: "Generate proofs on the Demo tab, verify on the Verify tab. Instant feedback, no roundtrips.",
      details: "Streamlined UX: separate concerns for proof generation and verification with full transparency.",
    },
    {
      title: "PRIVACY-FIRST",
      description: "Neither vector is ever shared or logged. Proofs are mathematically sound without data exposure.",
      details: "Zero-knowledge by design: verifier learns only the Hamming distance, nothing about inputs.",
    },
    {
      title: "EXTENSIBLE",
      description: "Customize the bit length or proof parameters. Built to integrate into larger identity systems.",
      details: "Modular architecture supports fuzzy matching, encrypted databases, and decentralized ID protocols.",
    },
  ]

  return (
    <section className="px-4 py-16 md:py-24 border-b-4 border-black">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-black mb-12">WHY BITVEIL?</h3>

        <Card className="p-0 bg-white border-4 border-black">
          <Accordion type="single" collapsible defaultValue="item-0">
            {features.map((feature, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className={idx !== features.length - 1 ? "border-b-2 border-black" : ""}
              >
                <AccordionTrigger className="px-8 py-6 font-black text-lg uppercase hover:bg-black/5 transition-colors text-left">
                  {feature.title}
                </AccordionTrigger>
                <AccordionContent className="px-8 py-6 border-t-2 border-black bg-black/2">
                  <div className="space-y-4">
                    <p className="font-medium text-black/80">{feature.description}</p>
                    <p className="text-sm text-black/60 leading-relaxed">{feature.details}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  )
}
