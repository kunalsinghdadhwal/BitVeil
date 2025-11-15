import type { Metadata } from 'next'

import './globals.css'
import { DM_Sans as V0_Font_DM_Sans, Space_Mono as V0_Font_Space_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

// Initialize fonts
const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _spaceMono = V0_Font_Space_Mono({ subsets: ['latin'], weight: ["400","700"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: 'BitVeil - Zero-Knowledge Proof Privacy',
  description: 'Prove Hamming distance privately with ZK. WASM-powered browser demo for secure binary vector similarity using Halo2 ZK-SNARKs.',
  keywords: [
    'zero-knowledge proofs',
    'ZK-SNARKs',
    'Halo2',
    'Hamming distance',
    'privacy-preserving',
    'WebAssembly',
    'WASM',
    'cryptography',
    'biometric matching',
    'secure computation',
    'Rust',
    'blockchain',
    'decentralized identity',
    'private set intersection',
  ],
  authors: [{ name: 'Kunal Singh Dadhwal', url: 'https://github.com/kunalsinghdadhwal' }],
  creator: 'Kunal Singh Dadhwal',
  publisher: 'BitVeil',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitveil.vercel.app',
    title: 'BitVeil - Privacy-Preserving Zero-Knowledge Proofs',
    description: 'Generate zero-knowledge proofs for Hamming distance calculations directly in your browser. Built with Halo2 ZK-SNARKs and WebAssembly for complete privacy.',
    siteName: 'BitVeil',
    images: [
      {
        url: '/og-image.png',
        alt: 'BitVeil - Zero-Knowledge Proof Privacy Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitVeil - Zero-Knowledge Proof Privacy',
    description: 'Prove Hamming distance privately with ZK-SNARKs. WASM-powered browser demo using Halo2 circuits.',
    images: ['/og-image.png'],
    creator: '@0xkun4l',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://bitveil.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
