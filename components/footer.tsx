"use client"

import { Github, Linkedin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#0a2e1c] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="text-yellow-300 text-xl">✧</div>
              <h2 className="text-lg font-semibold">BPE Tokenization Visualizer</h2>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              An interactive educational tool for understanding Byte Pair Encoding
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#164430] hover:text-white" asChild>
              <a href="https://github.com/simonrueba" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:bg-[#164430] hover:text-white" asChild>
              <a
                href="https://linkedin.com/in/simonrueba"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:bg-[#164430] hover:text-white" asChild>
              <a href="https://simonrueba.com" target="_blank" rel="noopener noreferrer" aria-label="Personal Website">
                <Globe className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#164430] text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} | Created with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
