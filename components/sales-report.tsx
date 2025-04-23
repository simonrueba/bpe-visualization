"use client"

export default function SalesReport() {
  const bpeOperations = [
    { name: "Character Splitting", count: 233 },
    { name: "Merge Operations", count: 23 },
    { name: "Vocabulary Size", count: 482 },
  ]

  // Find the maximum value for scaling
  const maxValue = Math.max(...bpeOperations.map((op) => op.count))

  return (
    <div className="space-y-4">
      {bpeOperations.map((operation, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{operation.name}</span>
            <span>({operation.count})</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div
              className="bg-[#a3e635] h-4 rounded-full"
              style={{ width: `${(operation.count / maxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
      </div>
    </div>
  )
}
