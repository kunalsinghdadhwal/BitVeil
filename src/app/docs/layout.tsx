import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - BitVeil',
  description: 'Complete documentation for BitVeil zero-knowledge proof circuits. Learn how to use Halo2 ZK-SNARKs for privacy-preserving Hamming distance proofs.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitveil.vercel.app/docs',
    title: 'BitVeil Documentation - Zero-Knowledge Proof Guide',
    description: 'Complete guide to using BitVeil for privacy-preserving Hamming distance proofs with Halo2 ZK-SNARKs and WebAssembly.',
    siteName: 'BitVeil',
    images: [
      {
        url: '/og-image.png',
        alt: 'BitVeil Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitVeil Documentation',
    description: 'Complete guide to zero-knowledge proofs for Hamming distance with Halo2 and WebAssembly.',
    images: ['/og-image.png'],
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
