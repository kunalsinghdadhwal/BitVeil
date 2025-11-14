import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo - BitVeil',
  description: 'Try BitVeil zero-knowledge proofs in your browser. Generate and verify privacy-preserving Hamming distance proofs for 32-bit binary vectors.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitveil.vercel.app/demo',
    title: 'BitVeil Demo - Try Zero-Knowledge Proofs',
    description: 'Interactive demo for generating zero-knowledge proofs of Hamming distance. All computations run locally in your browser using Halo2 and WebAssembly.',
    siteName: 'BitVeil',
    images: [
      {
        url: '/og-image.webp',
        alt: 'BitVeil Demo - Zero-Knowledge Proof Testing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitVeil Demo - Try ZK Proofs',
    description: 'Generate zero-knowledge proofs for Hamming distance in your browser. No server required.',
    images: ['/og-image.webp'],
  },
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
