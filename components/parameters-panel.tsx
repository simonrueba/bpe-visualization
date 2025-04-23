"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { BpeParameters } from "@/components/bpe-visualizer"

interface ParametersPanelProps {
  parameters: BpeParameters
  onParametersChange: (parameters: BpeParameters) => void
  onClose: () => void
}

export default function ParametersPanel({ parameters, onParametersChange, onClose }: ParametersPanelProps) {
  const handleMaxMergeOperationsChange = (value: number[]) => {
    onParametersChange({
      ...parameters,
      maxMergeOperations: value[0],
    })
  }

  const handleMinPairFrequencyChange = (value: number[]) => {
    onParametersChange({
      ...parameters,
      minPairFrequency: value[0],
    })
  }

  const handleToggleIncludeSpaces = (checked: boolean) => {
    onParametersChange({
      ...parameters,
      includeSpaces: checked,
    })
  }

  const handleToggleIncludePunctuation = (checked: boolean) => {
    onParametersChange({
      ...parameters,
      includePunctuation: checked,
    })
  }

  const handleToggleCaseSensitive = (checked: boolean) => {
    onParametersChange({
      ...parameters,
      caseSensitive: checked,
    })
  }

  const resetToDefaults = () => {
    onParametersChange({
      maxMergeOperations: 15,
      minPairFrequency: 1,
      includeSpaces: true,
      includePunctuation: true,
      caseSensitive: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Algorithm Parameters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Max Merge Operations */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="max-merges">Maximum Merge Operations</Label>
                <span className="text-sm font-medium">{parameters.maxMergeOperations}</span>
              </div>
              <Slider
                id="max-merges"
                min={1}
                max={50}
                step={1}
                value={[parameters.maxMergeOperations]}
                onValueChange={handleMaxMergeOperationsChange}
              />
              <p className="text-xs text-gray-500">
                Controls how many merge operations the algorithm will perform. Higher values create larger vocabularies.
              </p>
            </div>

            {/* Min Pair Frequency */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="min-frequency">Minimum Pair Frequency</Label>
                <span className="text-sm font-medium">{parameters.minPairFrequency}</span>
              </div>
              <Slider
                id="min-frequency"
                min={1}
                max={10}
                step={1}
                value={[parameters.minPairFrequency]}
                onValueChange={handleMinPairFrequencyChange}
              />
              <p className="text-xs text-gray-500">
                Sets the minimum frequency threshold for merging token pairs. Higher values only merge very common
                pairs.
              </p>
            </div>

            {/* Include Spaces */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-spaces" className="block mb-1">
                  Include Spaces
                </Label>
                <p className="text-xs text-gray-500">
                  When enabled, spaces are treated as tokens. When disabled, spaces are ignored.
                </p>
              </div>
              <Switch
                id="include-spaces"
                checked={parameters.includeSpaces}
                onCheckedChange={handleToggleIncludeSpaces}
              />
            </div>

            {/* Include Punctuation */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-punctuation" className="block mb-1">
                  Include Punctuation
                </Label>
                <p className="text-xs text-gray-500">
                  When enabled, punctuation marks are treated as tokens. When disabled, they are ignored.
                </p>
              </div>
              <Switch
                id="include-punctuation"
                checked={parameters.includePunctuation}
                onCheckedChange={handleToggleIncludePunctuation}
              />
            </div>

            {/* Case Sensitive */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="case-sensitive" className="block mb-1">
                  Case Sensitive
                </Label>
                <p className="text-xs text-gray-500">
                  When enabled, uppercase and lowercase letters are treated as different tokens.
                </p>
              </div>
              <Switch
                id="case-sensitive"
                checked={parameters.caseSensitive}
                onCheckedChange={handleToggleCaseSensitive}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="outline" onClick={resetToDefaults} className="mr-2">
                Reset to Defaults
              </Button>
              <Button onClick={onClose}>Apply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
