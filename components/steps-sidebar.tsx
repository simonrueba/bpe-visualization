"use client"

interface StepsSidebarProps {
  steps: {
    tokens: string[]
    mergedPair?: [string, string]
    mergedIndices?: number[][] // Changed to array of pairs
    newToken?: string
    frequencies?: Record<string, number>
    vocabularySize?: number
  }[]
  currentStep: number
  onSelectStep: (step: number) => void
}

export default function StepsSidebar({ steps, currentStep, onSelectStep }: StepsSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">BPE Steps</h2>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {steps.map((step, index) => {
          const isCurrentStep = index === currentStep
          const mergedPair = step.mergedPair
          const newToken = step.newToken
          const mergeCount = step.mergedIndices?.length || 0

          let stepDescription =
            index === 0 ? "Initial characters" : index % 2 === 1 ? "Highlighting merge pair" : "After merge operation"

          if (mergedPair && newToken) {
            stepDescription = `[${mergedPair[0]}] + [${mergedPair[1]}] → [${newToken}]`
            if (mergeCount > 1) {
              stepDescription += ` (${mergeCount} occurrences)`
            }
          }

          // Count tokens
          const tokenCount = step.tokens.length
          const vocabularySize = step.vocabularySize || 0

          return (
            <button
              key={index}
              className={`
                w-full text-left p-3 rounded-md text-sm transition-colors
                ${isCurrentStep ? "bg-[#0a2e1c] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}
              `}
              onClick={() => onSelectStep(index)}
            >
              <div className="font-medium">Step {index + 1}</div>
              <div className={`text-xs ${isCurrentStep ? "text-gray-200" : "text-gray-500"}`}>{stepDescription}</div>
              <div className={`text-xs mt-1 ${isCurrentStep ? "text-gray-200" : "text-gray-500"}`}>
                Tokens: {tokenCount} | Vocab: {vocabularySize}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
