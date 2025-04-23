"use client"

import { useEffect, useState } from "react"

interface TokenFrequencyProps {
  text: string
}

export default function TokenFrequency({ text }: TokenFrequencyProps) {
  const [frequencies, setFrequencies] = useState<{ token: string; count: number }[]>([])

  useEffect(() => {
    // Simple tokenization and frequency counting
    const countTokenFrequency = (input: string) => {
      // Split by spaces and then by special characters
      const words = input.split(/\s+/)
      const allTokens: string[] = []

      words.forEach((word) => {
        // Split words with punctuation
        const wordTokens = word.split(/([.,!?;:()'""-])/).filter((t) => t.length > 0)
        allTokens.push(...wordTokens)
      })

      // Count frequencies
      const freqMap: Record<string, number> = {}
      allTokens.forEach((token) => {
        freqMap[token] = (freqMap[token] || 0) + 1
      })

      // Convert to array and sort by frequency
      return Object.entries(freqMap)
        .map(([token, count]) => ({ token, count }))
        .sort((a, b) => b.count - a.count)
    }

    setFrequencies(countTokenFrequency(text))
  }, [text])

  // Calculate the maximum count for scaling
  const maxCount = Math.max(...frequencies.map((f) => f.count), 1)

  return (
    <div className="h-[300px] flex items-end gap-2">
      {frequencies.slice(0, 6).map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="w-full flex gap-1">
            <div className="bg-[#0a2e1c] rounded-t w-6" style={{ height: `${(item.count / maxCount) * 200}px` }}></div>
            <div
              className="bg-[#a3e635] rounded-t flex-1"
              style={{ height: `${(item.count / maxCount) * 180}px` }}
            ></div>
          </div>
          <div className="text-xs mt-1 w-full text-center truncate">{item.token}</div>
          <div className="text-xs text-gray-500">+35%</div>
        </div>
      ))}
    </div>
  )
}
