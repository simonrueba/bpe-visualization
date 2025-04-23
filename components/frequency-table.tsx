"use client"

import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FrequencyTableProps {
  frequencies: Record<string, number>
}

export default function FrequencyTable({ frequencies }: FrequencyTableProps) {
  // Sort pairs by frequency (highest first)
  const sortedPairs = Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Show top 10 pairs

  // Find the highest frequency for scaling the bars
  const maxFrequency = sortedPairs.length > 0 ? sortedPairs[0][1] : 1

  // Function to format token display (replace spaces with visible symbols)
  const formatTokenDisplay = (token: string) => {
    if (token === " ") {
      return "␣"
    } else if (token.includes(" ")) {
      return token.replace(/ /g, "␣")
    }
    return token
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Pair Frequencies</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-gray-500 cursor-help">
                <InfoCircle className="h-4 w-4 mr-1" />
                What is this?
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>
                This chart shows the frequency of adjacent token pairs in the current text. The length of each bar
                represents how often that pair appears relative to the most frequent pair. The BPE algorithm merges the
                most frequent pair in each step.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        {sortedPairs.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No token pairs available</div>
        ) : (
          sortedPairs.map(([pair, frequency], index) => {
            const [first, second] = pair.split(",")
            const barWidth = `${(frequency / maxFrequency) * 100}%`

            // Highlight the most frequent pair
            const isHighestFrequency = index === 0
            const highlightClass = isHighestFrequency ? "bg-yellow-100 border-yellow-300" : ""

            return (
              <div key={index} className={`flex items-center gap-3 p-1 rounded ${highlightClass}`}>
                <div className="w-[100px] min-w-[100px] font-mono text-sm flex items-center gap-1 overflow-hidden">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 truncate">
                          {formatTokenDisplay(first)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">{formatTokenDisplay(first)}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>+</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 truncate">
                          {formatTokenDisplay(second)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">{formatTokenDisplay(second)}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isHighestFrequency ? "bg-yellow-400" : "bg-[#a3e635]"}`}
                    style={{ width: barWidth }}
                  ></div>
                </div>

                <div className="w-8 text-right text-sm font-medium">{frequency}</div>
              </div>
            )
          })
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          The BPE algorithm selects the most frequent pair (highlighted in yellow) to merge in each step. This creates a
          new token that replaces all occurrences of that pair.
        </p>
      </div>
    </div>
  )
}
