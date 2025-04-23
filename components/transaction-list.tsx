"use client"

import { useState, useEffect } from "react"
import { Check, Clock } from "lucide-react"

interface TransactionListProps {
  text: string
}

export default function TransactionList({ text }: TransactionListProps) {
  const [tokens, setTokens] = useState<
    {
      id: string
      token: string
      status: "Completed" | "Pending"
      timestamp: string
    }[]
  >([])

  useEffect(() => {
    // Simple tokenization for demonstration
    const simpleTokenize = (input: string) => {
      // Split by spaces and then by special characters
      const words = input.split(/\s+/)
      const allTokens: string[] = []

      words.forEach((word) => {
        // Split words with punctuation
        const wordTokens = word.split(/([.,!?;:()'""-])/).filter((t) => t.length > 0)
        allTokens.push(...wordTokens)
      })

      return allTokens.map((token, index) => ({
        id: `TKN${index}`,
        token,
        status: Math.random() > 0.3 ? "Completed" : "Pending",
        timestamp: "Jul 12th 2024",
      }))
    }

    setTokens(simpleTokenize(text))
  }, [text])

  return (
    <div className="space-y-4">
      {tokens.slice(0, 7).map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-mono">
                {item.token.length > 1 ? item.token.substring(0, 1) : item.token}
              </span>
            </div>
            <div>
              <div className="font-medium">{item.token}</div>
              <div className="text-xs text-gray-500">{item.timestamp}</div>
            </div>
          </div>

          <div className={`text-sm ${item.status === "Completed" ? "text-green-600" : "text-amber-600"}`}>
            {item.status === "Completed" ? (
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Completed
              </div>
            ) : (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Pending
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
