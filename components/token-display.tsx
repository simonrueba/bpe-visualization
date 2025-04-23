"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TokenDisplayProps {
  tokens: string[]
  mergedPair?: [string, string]
  mergedIndices?: number[][] // Array of pairs
  newToken?: string
  step: number
  mergeHistory: Record<string, { parts: [string, string]; count: number }>
  vocabulary?: string[] // Added vocabulary prop
}

export default function TokenDisplay({
  tokens,
  mergedPair,
  mergedIndices,
  newToken,
  step,
  mergeHistory,
  vocabulary = [], // Default to empty array if not provided
}: TokenDisplayProps) {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null)
  const [showTokenIds, setShowTokenIds] = useState<boolean>(true)

  // Modify the token display to better represent whitespace characters
  const getTokenColor = (token: string) => {
    // Special case for whitespace tokens
    if (token === " " || token.includes(" ")) {
      return "bg-gray-50 border-gray-300 whitespace-token" // Special class for whitespace tokens
    }

    const length = token.length

    if (length === 1) return "bg-gray-100 border-gray-300" // Base character
    if (length === 2) return "bg-[#e6f7e6] border-[#a3e635]" // First merge
    if (length === 3) return "bg-[#d1f0d1] border-[#84cc16]" // Second merge
    if (length === 4) return "bg-[#b3e6b3] border-[#65a30d]" // Third merge
    if (length === 5) return "bg-[#99d699] border-[#4d7c0f]" // Fourth merge
    return "bg-[#66c266] border-[#0a2e1c] text-white" // Fifth+ merge
  }

  // Get token history for tooltip
  const getTokenHistory = (token: string) => {
    if (token.length === 1) return `Original character: "${token}"`

    // Recursively build the merge history
    const buildHistory = (currentToken: string, history: string[] = []): string[] => {
      const mergeInfo = mergeHistory[currentToken]
      if (!mergeInfo) return history

      const [first, second] = mergeInfo.parts
      history.unshift(`[${first}] + [${second}] → [${currentToken}]`)

      // If either part is a merged token, get its history too
      if (first.length > 1) {
        buildHistory(first, history)
      }

      if (second.length > 1) {
        buildHistory(second, history)
      }

      return history
    }

    const mergeSteps = buildHistory(token)
    const tokenId = vocabulary.indexOf(token)
    const tokenIdInfo = tokenId !== -1 ? `Token ID: ${tokenId}` : "Token not in vocabulary"

    return (
      <div className="space-y-1">
        <div className="font-semibold">Token: "{token}"</div>
        <div className="text-sm font-medium">{tokenIdInfo}</div>
        <div>Created by merging:</div>
        {mergeSteps.length > 0 ? (
          mergeSteps.map((step, i) => (
            <div key={i} className="text-sm">
              {step}
            </div>
          ))
        ) : (
          <div className="text-sm italic">Merge history not available</div>
        )}
        <div className="text-sm mt-2">Length: {token.length} characters</div>
      </div>
    )
  }

  // Get token display text - replace spaces with visible symbols
  const getTokenDisplayText = (token: string) => {
    if (token === " ") {
      return "␣" // Space symbol
    } else if (token.includes(" ")) {
      return token.replace(/ /g, "␣")
    }
    return token
  }

  // Check if a token is part of any merge pair
  const isTokenInMergePair = (index: number) => {
    if (!mergedIndices) return false

    // Check if this index is in any of the merge pairs
    return mergedIndices.some((pair) => pair.includes(index))
  }

  // Check if a token is the first in a merge pair
  const isFirstInMergePair = (index: number) => {
    if (!mergedIndices) return false

    // Check if this index is the first element in any merge pair
    return mergedIndices.some((pair) => pair[0] === index)
  }

  // Check if a token is the second in a merge pair
  const isSecondInMergePair = (index: number) => {
    if (!mergedIndices) return false

    // Check if this index is the second element in any merge pair
    return mergedIndices.some((pair) => pair[1] === index)
  }

  // Get token ID from vocabulary
  const getTokenId = (token: string) => {
    return vocabulary.indexOf(token)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Switch id="show-token-ids" checked={showTokenIds} onCheckedChange={setShowTokenIds} />
          <Label htmlFor="show-token-ids">Show Token IDs</Label>
        </div>
      </div>

      <TooltipProvider>
        <div className="min-h-[200px] border rounded-lg p-6 flex flex-wrap gap-2 items-start">
          <style jsx global>{`
            .whitespace-token {
              position: relative;
              min-width: 2rem;
              text-align: center;
            }
            .token-id {
              position: absolute;
              top: -8px;
              right: -8px;
              background-color: #0a2e1c;
              color: white;
              border-radius: 9999px;
              font-size: 0.65rem;
              padding: 2px 4px;
              min-width: 16px;
              text-align: center;
              font-weight: 600;
            }
          `}</style>
          <AnimatePresence>
            {tokens.map((token, index) => {
              const isHighlighted = isTokenInMergePair(index)
              const isFirstInMerge = isFirstInMergePair(index)
              const isSecondInMerge = isSecondInMergePair(index)
              const tokenId = getTokenId(token)

              return (
                <Tooltip key={`${token}-${index}-${step}`}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`
                        relative px-3 py-2 rounded-md border-2 font-mono text-sm
                        ${getTokenColor(token)}
                        ${isHighlighted ? "ring-2 ring-yellow-400" : ""}
                      `}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={
                        isFirstInMerge
                          ? {
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 0 rgba(250, 204, 21, 0)",
                                "0 0 15px rgba(250, 204, 21, 0.7)",
                                "0 0 0 rgba(250, 204, 21, 0)",
                              ],
                            }
                          : isSecondInMerge
                            ? { opacity: [1, 0.7, 1] }
                            : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: isHighlighted ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                      onMouseEnter={() => setHoveredToken(index)}
                      onMouseLeave={() => setHoveredToken(null)}
                    >
                      {getTokenDisplayText(token)}
                      {showTokenIds && tokenId !== -1 && <span className="token-id">{tokenId}</span>}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    {getTokenHistory(token)}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </AnimatePresence>
        </div>
      </TooltipProvider>
    </div>
  )
}
