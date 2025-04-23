export default function PromotionCard() {
  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path d="M0 0L100 0L100 100Z" fill="#a3e635" />
        </svg>
      </div>

      <div className="pt-10">
        <h3 className="text-2xl font-bold mb-2">Level up your tokenization to the next level.</h3>
        <p className="text-gray-600 mb-6">An easy way to manage tokenization with care and precision.</p>

        <button className="w-full bg-[#0a2e1c] text-white py-3 rounded-md hover:bg-[#164430] transition-colors">
          Update to Tokenizer+
        </button>
      </div>
    </div>
  )
}
