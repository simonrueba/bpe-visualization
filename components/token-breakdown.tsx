"use client"

import { useEffect, useRef } from "react"

export default function TokenBreakdown() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Draw donut chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 80
    const innerRadius = 50

    // Data for the chart
    const data = [
      { value: 68, color: "#a3e635" }, // Green segment (68%)
      { value: 16, color: "#fb923c" }, // Orange segment (16%)
      { value: 16, color: "#0a2e1c" }, // Dark green segment (16%)
    ]

    let startAngle = 0
    let endAngle = 0

    // Draw segments
    data.forEach((segment) => {
      // Calculate the angle for this segment
      endAngle = startAngle + (segment.value / 100) * (Math.PI * 2)

      // Draw the segment
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()

      // Fill with segment color
      ctx.fillStyle = segment.color
      ctx.fill()

      // Update the starting angle for the next segment
      startAngle = endAngle
    })

    // Draw center circle (white)
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius - 5, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()

    // Add text in the center
    ctx.fillStyle = "#000"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("565K", centerX, centerY - 5)

    ctx.font = "12px Arial"
    ctx.fillText("Total Count", centerX, centerY + 15)
  }, [])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={200} height={200} />
    </div>
  )
}
