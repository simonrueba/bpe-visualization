"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InfoPanelProps {
  onClose: () => void
}

export default function InfoPanel({ onClose }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">About BPE Tokenization</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Byte Pair Encoding (BPE)</strong> is a data compression technique that iteratively replaces the
              most frequent pair of bytes (or characters) in a sequence with a single, unused byte (or a new character).
              In the context of NLP, it's used to create subword tokens that balance the advantages of character-level
              and word-level tokenization.
            </p>

            <h3 className="text-lg font-semibold mt-4">How BPE Works:</h3>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Initialization:</strong> Start with a vocabulary of individual characters from your text.
              </li>
              <li>
                <strong>Count Frequencies:</strong> Count how often each adjacent pair of tokens appears in the text.
              </li>
              <li>
                <strong>Merge Most Frequent Pair:</strong> Replace the most frequent pair with a new token that
                represents that pair.
              </li>
              <li>
                <strong>Repeat:</strong> Continue this process for a fixed number of merges or until a desired
                vocabulary size is reached.
              </li>
            </ol>

            <h3 className="text-lg font-semibold mt-4">Example:</h3>

            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
              <p>Starting with: "low lower lowest"</p>
              <p className="mt-2">
                Initial tokens: ['l', 'o', 'w', ' ', 'l', 'o', 'w', 'e', 'r', ' ', 'l', 'o', 'w', 'e', 's', 't']
              </p>
              <p className="mt-2">Most frequent pair: 'l' and 'o' (appears 3 times)</p>
              <p className="mt-2">After merge: ['lo', 'w', ' ', 'lo', 'w', 'e', 'r', ' ', 'lo', 'w', 'e', 's', 't']</p>
              <p className="mt-2">Most frequent pair: 'lo' and 'w' (appears 3 times)</p>
              <p className="mt-2">After merge: ['low', ' ', 'low', 'e', 'r', ' ', 'low', 'e', 's', 't']</p>
              <p className="mt-2">And so on...</p>
            </div>

            <h3 className="text-lg font-semibold mt-4">Token IDs:</h3>

            <p>
              Each token in the vocabulary is assigned a unique integer ID. These IDs are used by the model to represent
              the tokens. In most implementations:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>IDs are assigned sequentially starting from 0 for the base vocabulary</li>
              <li>New tokens created through merges receive the next available ID</li>
              <li>Special tokens (like beginning/end of text markers) often have reserved IDs</li>
              <li>The token ID mapping is fixed after training and used for encoding/decoding</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Why BPE is Important:</h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Efficiency:</strong> It creates a balance between character-level and word-level tokenization.
              </li>
              <li>
                <strong>Handling Rare Words:</strong> It can break down rare or unknown words into subword units.
              </li>
              <li>
                <strong>Language Agnostic:</strong> Works well across different languages without language-specific
                rules.
              </li>
              <li>
                <strong>Used in Modern AI:</strong> BPE is used in many language models like GPT, BERT, and others.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Using This Visualizer:</h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Enter Text:</strong> Type or paste text in the input field.
              </li>
              <li>
                <strong>Step Controls:</strong> Use the play/pause, next, and previous buttons to control the
                visualization.
              </li>
              <li>
                <strong>Hover on Tokens:</strong> Hover over tokens to see their merge history.
              </li>
              <li>
                <strong>Sidebar:</strong> Click on steps in the sidebar to jump to specific merge operations.
              </li>
              <li>
                <strong>Frequency Table:</strong> See which token pairs occur most frequently at each step.
              </li>
              <li>
                <strong>Token IDs:</strong> Toggle the display of token IDs to see how tokens are numerically
                represented.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
