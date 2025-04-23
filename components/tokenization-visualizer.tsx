"use client"

import { useState, useEffect } from "react"

interface TokenizationVisualizerProps {
  text: string
}

export default function TokenizationVisualizer({ text }: TokenizationVisualizerProps) {
  const [tokens, setTokens] = useState<string[]>([])

  useEffect(() => {
    // Simple tokenization for demonstration
    // In a real implementation, you would use a proper BPE tokenizer
    const simpleTokenize = (input: string) => {
      // Split by spaces and then by special characters
      const words = input.split(/\s+/)
      const allTokens: string[] = []

      words.forEach((word) => {
        // Split words with punctuation
        const wordTokens = word.split(/([.,!?;:()'""-])/).filter((t) => t.length > 0)
        allTokens.push(...wordTokens)
      })

      return allTokens
    }

    setTokens(simpleTokenize(text))
  }, [text])

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-wrap gap-2">
        {tokens.map((token, index) => (
          <div key={index} className="border border-[#0a2e1c] rounded px-2 py-1 text-sm bg-[#f5f7e8]">
            {token}
          </div>
        ))}
      </div>
    </div>
  )
}
