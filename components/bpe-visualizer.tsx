"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Info, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import TokenDisplay from "@/components/token-display"
import StepsSidebar from "@/components/steps-sidebar"
import FrequencyTable from "@/components/frequency-table"
import InfoPanel from "@/components/info-panel"
import ParametersPanel from "@/components/parameters-panel"
import Footer from "@/components/footer"

// Define the BPE parameters interface
export interface BpeParameters {
  maxMergeOperations: number
  minPairFrequency: number
  includeSpaces: boolean
  includePunctuation: boolean
  caseSensitive: boolean
}

export default function BpeVisualizer() {
  const [inputText, setInputText] = useState("Hello, world!")
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [showParametersPanel, setShowParametersPanel] = useState(false)
  const [vocabulary, setVocabulary] = useState<string[]>([])

  // BPE parameters with defaults
  const [parameters, setParameters] = useState<BpeParameters>({
    maxMergeOperations: 15,
    minPairFrequency: 1,
    includeSpaces: true,
    includePunctuation: true,
    caseSensitive: true,
  })

  // BPE algorithm state
  const [steps, setSteps] = useState<
    {
      tokens: string[]
      mergedPair?: [string, string]
      mergedIndices?: number[][] // Array of pairs
      newToken?: string
      frequencies?: Record<string, number>
      mergeHistory?: Record<string, { parts: [string, string]; count: number }>
      vocabularySize?: number
      vocabulary?: string[] // Added vocabulary to each step
    }[]
  >([])

  // Initialize BPE process when input text changes or parameters change
  useEffect(() => {
    if (!inputText) return

    // Preprocess text based on parameters
    let processedText = inputText

    if (!parameters.caseSensitive) {
      processedText = processedText.toLowerCase()
    }

    // Start with character-level tokenization
    const initialTokens: string[] = []

    // Process the text character by character
    for (let i = 0; i < processedText.length; i++) {
      const char = processedText[i]

      // Skip spaces if includeSpaces is false
      if (!parameters.includeSpaces && char === " ") continue

      // Skip punctuation if includePunctuation is false
      if (!parameters.includePunctuation && /[^\w\s]/.test(char)) continue

      initialTokens.push(char)
    }

    // Calculate initial frequencies
    const initialFrequencies = calculatePairFrequencies(initialTokens)

    // Initialize vocabulary with unique characters
    const initialVocabulary = Array.from(new Set(initialTokens))
    initialVocabulary.sort() // Sort for consistent token IDs

    // Initialize steps with the first step (character-level tokens)
    const initialStep = {
      tokens: initialTokens,
      frequencies: initialFrequencies,
      mergeHistory: {} as Record<string, { parts: [string, string]; count: number }>,
      vocabularySize: initialVocabulary.length,
      vocabulary: initialVocabulary,
    }

    const allSteps = [initialStep]

    // Run BPE algorithm to generate all steps
    let currentTokens = [...initialTokens]
    let currentMergeHistory = { ...initialStep.mergeHistory }
    const currentVocabulary = [...initialVocabulary]

    // Limit to maxMergeOperations
    for (let i = 0; i < parameters.maxMergeOperations; i++) {
      const frequencies = calculatePairFrequencies(currentTokens)

      // Find most frequent pair that meets the minimum frequency threshold
      let mostFrequentPair: [string, string] | null = null
      let highestFrequency = parameters.minPairFrequency - 1 // Start below threshold

      Object.entries(frequencies).forEach(([pairStr, frequency]) => {
        if (frequency > highestFrequency) {
          highestFrequency = frequency
          const [first, second] = pairStr.split(",")
          mostFrequentPair = [first, second]
        }
      })

      // If no more pairs to merge or frequency is below threshold, stop
      if (!mostFrequentPair || highestFrequency < parameters.minPairFrequency) break

      // Create new merged token
      const [first, second] = mostFrequentPair
      const newToken = first + second

      // Find all occurrences of the pair
      const mergedIndices: number[][] = []
      for (let j = 0; j < currentTokens.length - 1; j++) {
        if (currentTokens[j] === first && currentTokens[j + 1] === second) {
          mergedIndices.push([j, j + 1])
        }
      }

      if (mergedIndices.length === 0) break

      // Add step before merging
      allSteps.push({
        tokens: [...currentTokens],
        mergedPair: [first, second],
        mergedIndices: mergedIndices,
        newToken,
        frequencies,
        mergeHistory: { ...currentMergeHistory },
        vocabularySize: currentVocabulary.length,
        vocabulary: [...currentVocabulary],
      })

      // Update merge history
      currentMergeHistory = {
        ...currentMergeHistory,
        [newToken]: { parts: [first, second], count: highestFrequency },
      }

      // Add new token to vocabulary
      currentVocabulary.push(newToken)

      // Merge all occurrences of the pair
      // We need to process from right to left to avoid index shifting
      const sortedIndices = [...mergedIndices].sort((a, b) => b[0] - a[0])

      for (const [firstIdx, secondIdx] of sortedIndices) {
        currentTokens = [...currentTokens.slice(0, firstIdx), newToken, ...currentTokens.slice(secondIdx + 1)]
      }

      // Add step after merging
      allSteps.push({
        tokens: [...currentTokens],
        frequencies: calculatePairFrequencies(currentTokens),
        mergeHistory: { ...currentMergeHistory },
        vocabularySize: currentVocabulary.length,
        vocabulary: [...currentVocabulary],
      })
    }

    setSteps(allSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [inputText, parameters])

  // Update current vocabulary when step changes
  useEffect(() => {
    if (steps.length > 0 && steps[currentStep] && steps[currentStep].vocabulary) {
      setVocabulary(steps[currentStep].vocabulary)
    }
  }, [currentStep, steps])

  // Calculate pair frequencies for BPE
  function calculatePairFrequencies(tokens: string[]) {
    const frequencies: Record<string, number> = {}

    for (let i = 0; i < tokens.length - 1; i++) {
      const pair = `${tokens[i]},${tokens[i + 1]}`
      frequencies[pair] = (frequencies[pair] || 0) + 1
    }

    return frequencies
  }

  // Handle autoplay
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1
        if (nextStep >= steps.length) {
          setIsPlaying(false)
          return prev
        }
        return nextStep
      })
    }, 1000 / playbackSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length, playbackSpeed])

  // Handle preset examples
  const handlePresetExample = (example: string) => {
    setInputText(example)
  }

  // Navigation controls
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentStepData = steps[currentStep] || { tokens: [] }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#0a2e1c] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-yellow-300 text-xl">✧</div>
            <h1 className="text-xl font-bold">BPE Tokenization Visualizer</h1>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#164430]"
                    onClick={() => setShowParametersPanel(!showParametersPanel)}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Algorithm Parameters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#164430]"
                    onClick={() => setShowInfoPanel(!showInfoPanel)}
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About BPE Tokenization</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="mb-4">
            <label htmlFor="input-text" className="block text-sm font-medium mb-2">
              Enter Text to Tokenize:
            </label>
            <Input
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full"
              placeholder="Type text here..."
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => handlePresetExample("Hello, world!")}>
              "Hello, world!"
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePresetExample("Machine Learning")}>
              "Machine Learning"
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePresetExample("ChatGPT is amazing!")}>
              "ChatGPT is amazing!"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePresetExample("The quick brown fox jumps over the lazy dog")}
            >
              "The quick brown fox..."
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentStep === 0}>
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={togglePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="icon" onClick={handleNext} disabled={currentStep >= steps.length - 1}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Speed:</span>
              <div className="w-32">
                <Slider
                  value={[playbackSpeed]}
                  min={0.5}
                  max={3}
                  step={0.5}
                  onValueChange={(value) => setPlaybackSpeed(value[0])}
                />
              </div>
              <span className="text-sm text-gray-500">{playbackSpeed}x</span>
            </div>

            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with Steps */}
          <div className="lg:col-span-1">
            <StepsSidebar steps={steps} currentStep={currentStep} onSelectStep={setCurrentStep} />
          </div>

          {/* Main Visualization Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Token Display */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Tokenization Visualization</h2>
              <TokenDisplay
                tokens={currentStepData.tokens}
                mergedPair={currentStepData.mergedPair}
                mergedIndices={currentStepData.mergedIndices}
                newToken={currentStepData.newToken}
                step={currentStep}
                mergeHistory={currentStepData.mergeHistory || {}}
                vocabulary={vocabulary}
              />
            </div>

            {/* Frequency Table and Vocabulary Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Token Pair Frequencies</h2>
                <FrequencyTable frequencies={currentStepData.frequencies || {}} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Vocabulary Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Vocabulary Size</div>
                    <div className="text-3xl font-bold">{currentStepData.vocabularySize || 0}</div>
                    <div className="text-sm text-gray-500 mt-1">unique tokens</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Compression Ratio</div>
                    <div className="text-3xl font-bold">
                      {steps.length > 0 && steps[0].tokens.length > 0 && currentStepData.tokens.length > 0
                        ? (steps[0].tokens.length / currentStepData.tokens.length).toFixed(2)
                        : "1.00"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">original length / current length</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocabulary Display */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Current Vocabulary</h2>
              <div className="border rounded-lg p-4 max-h-[200px] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {vocabulary.map((token, index) => (
                    <div key={index} className="flex items-center border rounded px-2 py-1 text-sm bg-gray-50">
                      <span className="font-mono mr-2 text-xs bg-[#0a2e1c] text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {index}
                      </span>
                      <span className="font-mono">
                        {token === " " ? "␣" : token.includes(" ") ? token.replace(/ /g, "␣") : token}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Footer */}
      <Footer />

      {/* Info Panel */}
      {showInfoPanel && <InfoPanel onClose={() => setShowInfoPanel(false)} />}

      {/* Parameters Panel */}
      {showParametersPanel && (
        <ParametersPanel
          parameters={parameters}
          onParametersChange={setParameters}
          onClose={() => setShowParametersPanel(false)}
        />
      )}
    </div>
  )
}
