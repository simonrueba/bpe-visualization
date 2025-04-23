"use client"

import { useState } from "react"
import { Search, Bell, Plus, MoreHorizontal, Calendar, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TokenBreakdown from "@/components/token-breakdown"
import TokenFrequency from "@/components/token-frequency"
import TransactionList from "@/components/transaction-list"
import SalesReport from "@/components/sales-report"
import PromotionCard from "@/components/promotion-card"

export default function Dashboard() {
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog.")
  const [dateRange, setDateRange] = useState("January 2024 - May 2024")

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a2e1c] text-white">
        <div className="p-6 flex items-center gap-2">
          <div className="text-yellow-300">✧</div>
          <div className="text-xl font-semibold">Tokenizer</div>
        </div>

        <div className="px-4 py-2 text-xs font-medium text-gray-300">MENU</div>

        <div className="space-y-1 px-3">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center bg-[#164430] rounded">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm"></div>
              </div>
            </div>
            Overview
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 4 4 6-6" />
              </svg>
            </div>
            Statistics
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            Models
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            Tokenizers
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            Messages
            <span className="ml-auto bg-yellow-300 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              8
            </span>
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            History
          </Button>
        </div>

        <div className="px-4 py-2 mt-6 text-xs font-medium text-gray-300">GENERAL</div>

        <div className="space-y-1 px-3">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            Settings
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#164430] hover:text-white">
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            Security
          </Button>
        </div>

        <div className="absolute bottom-0 w-64 p-4 border-t border-[#164430]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-[#0a2e1c] font-bold">
              T
            </div>
            <div>
              <div className="text-sm font-medium">Tokenizer Pro</div>
              <div className="text-xs text-gray-300">tokenizer@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">BPE Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 w-64 bg-gray-50" placeholder="Search anything in Tokenizer..." />
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button className="bg-[#0a2e1c] hover:bg-[#164430]">
              <Plus className="h-4 w-4 mr-2" />
              Add new token
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-gray-500">An easy way to visualize BPE tokenization with care and precision.</p>
          </div>

          <div className="flex justify-between mb-6">
            <div className="bg-[#0a2e1c] text-white p-6 rounded-lg w-full max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Update</span>
              </div>
              <div className="text-sm text-gray-300 mb-1">Feb 12th 2024</div>
              <div className="text-xl font-semibold mb-1">Token efficiency increased</div>
              <div className="text-yellow-300 text-xl font-bold mb-4">40% in 1 week</div>

              <div className="flex items-center text-sm text-gray-300">
                <span>See Statistics</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <Button variant="outline" className="h-10 gap-2 ml-6">
              <Calendar className="h-4 w-4" />
              {dateRange}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Token Count */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Token Count</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$</span>
                <span className="text-4xl font-bold">12</span>
              </div>

              <div className="flex items-center mt-2 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+35% from last input</span>
              </div>
            </div>

            {/* Compression Ratio */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Compression Ratio</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$</span>
                <span className="text-4xl font-bold">1.8</span>
              </div>

              <div className="flex items-center mt-2 text-sm text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>-24% from last input</span>
              </div>
            </div>

            {/* Total View Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm row-span-2">
              <h3 className="font-medium mb-4">Total Token Distribution</h3>

              <TokenBreakdown />

              <div className="mt-4 text-sm text-gray-500">Here are some tips on how to improve your tokenization.</div>

              <Button variant="outline" className="w-full mt-4">
                Guide Views
              </Button>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-xs">Word Count</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0a2e1c] rounded"></div>
                  <span className="text-xs">Percentage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded"></div>
                  <span className="text-xs">Tokens</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Tokenization Visualizer */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Tokenization</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to tokenize..."
                  className="w-full"
                />
              </div>

              <TransactionList text={inputText} />
            </div>

            {/* Token Frequency */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Token Frequency</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <TokenFrequency text={inputText} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BPE Merge Operations */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">BPE Merge Operations</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <SalesReport />
            </div>

            {/* Promotion Card */}
            <div className="bg-[#f5f7e8] p-6 rounded-lg shadow-sm">
              <PromotionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
