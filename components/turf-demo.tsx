"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Calculator, Zap, Target } from "lucide-react"
import * as turf from "@turf/turf"

export default function TurfDemo() {
  const [bufferDistance, setBufferDistance] = useState(1)
  const [bufferResult, setBufferResult] = useState<any>(null)
  const [distanceResult, setDistanceResult] = useState<number | null>(null)
  const [areaResult, setAreaResult] = useState<number | null>(null)
  const [pointInPolygonResult, setPointInPolygonResult] = useState<boolean | null>(null)

  // Sample coordinates for Kathmandu area
  const kathmanduPoint = turf.point([85.324, 27.7172])
  const bhaktapurPoint = turf.point([85.4298, 27.671])
  const kathmanduPolygon = turf.polygon([
    [
      [85.2, 27.6],
      [85.4, 27.6],
      [85.4, 27.8],
      [85.2, 27.8],
      [85.2, 27.6],
    ],
  ])

  // Buffer Analysis
  const calculateBuffer = () => {
    const buffer = turf.buffer(kathmanduPoint, bufferDistance, { units: "kilometers" })
    setBufferResult(buffer)
  }

  // Distance Calculation
  const calculateDistance = () => {
    const distance = turf.distance(kathmanduPoint, bhaktapurPoint, { units: "kilometers" })
    setDistanceResult(Math.round(distance * 100) / 100)
  }

  // Area Calculation
  const calculateArea = () => {
    const area = turf.area(kathmanduPolygon)
    setAreaResult(Math.round((area / 1000000) * 100) / 100) // Convert to km²
  }

  // Point in Polygon
  const checkPointInPolygon = () => {
    const isInside = turf.booleanPointInPolygon(kathmanduPoint, kathmanduPolygon)
    setPointInPolygonResult(isInside)
  }

  useEffect(() => {
    calculateBuffer()
    calculateDistance()
    calculateArea()
    checkPointInPolygon()
  }, [bufferDistance])

  const demos = [
    {
      title: "Buffer Analysis",
      icon: Target,
      description: "Create buffer zones around point features",
      action: calculateBuffer,
      result: bufferResult ? `Buffer created with ${bufferDistance}km radius` : null,
      interactive: true,
    },
    {
      title: "Distance Calculation",
      icon: Calculator,
      description: "Calculate distance between Kathmandu and Bhaktapur",
      action: calculateDistance,
      result: distanceResult ? `${distanceResult} kilometers` : null,
      interactive: false,
    },
    {
      title: "Area Measurement",
      icon: MapPin,
      description: "Calculate area of polygon geometry",
      action: calculateArea,
      result: areaResult ? `${areaResult} km²` : null,
      interactive: false,
    },
    {
      title: "Spatial Query",
      icon: Zap,
      description: "Point-in-polygon spatial relationship",
      action: checkPointInPolygon,
      result:
        pointInPolygonResult !== null
          ? pointInPolygonResult
            ? "Point is inside polygon"
            : "Point is outside polygon"
          : null,
      interactive: false,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Interactive Buffer Control */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Interactive Buffer Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="buffer-distance" className="text-white/80">
                Buffer Distance (km)
              </Label>
              <Input
                id="buffer-distance"
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                value={bufferDistance}
                onChange={(e) => setBufferDistance(Number.parseFloat(e.target.value))}
                className="bg-white/10 border-cyan-500/30 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Center Point:</span>
                <p className="text-cyan-400">Kathmandu (27.7172°N, 85.324°E)</p>
              </div>
              <div>
                <span className="text-white/60">Buffer Area:</span>
                <p className="text-cyan-400">
                  {bufferResult
                    ? `${Math.round((turf.area(bufferResult) / 1000000) * 100) / 100} km²`
                    : "Calculating..."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {demos.map((demo, index) => (
          <Card
            key={index}
            className="bg-white/5 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                  <demo.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{demo.title}</h3>
                  <p className="text-white/60 text-sm">{demo.description}</p>
                </div>
              </div>

              {demo.result && (
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 mb-4">
                  <p className="text-cyan-400 font-mono text-sm">{demo.result}</p>
                </div>
              )}

              {!demo.interactive && (
                <Button
                  onClick={demo.action}
                  variant="outline"
                  size="sm"
                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent w-full"
                >
                  Calculate
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code Examples */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Turf.js Code Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Buffer Analysis</h4>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`// Create a buffer around a point
const point = turf.point([85.324, 27.7172]);
const buffer = turf.buffer(point, ${bufferDistance}, {units: 'kilometers'});
const area = turf.area(buffer); // ${bufferResult ? Math.round((turf.area(bufferResult) / 1000000) * 100) / 100 : 0} km²`}
              </pre>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Distance Calculation</h4>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`// Calculate distance between two points
const kathmandu = turf.point([85.324, 27.7172]);
const bhaktapur = turf.point([85.4298, 27.6710]);
const distance = turf.distance(kathmandu, bhaktapur, {units: 'kilometers'});
// Result: ${distanceResult} km`}
              </pre>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Spatial Query</h4>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`// Check if point is inside polygon
const point = turf.point([85.324, 27.7172]);
const polygon = turf.polygon([[[85.2,27.6],[85.4,27.6],[85.4,27.8],[85.2,27.8],[85.2,27.6]]]);
const isInside = turf.booleanPointInPolygon(point, polygon);
// Result: ${pointInPolygonResult}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Operations */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Advanced Geospatial Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Intersection</h4>
              <p className="text-white/60 text-sm">Find overlapping areas between geometries</p>
              <code className="text-cyan-400 text-xs">turf.intersect()</code>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Union</h4>
              <p className="text-white/60 text-sm">Combine multiple polygons into one</p>
              <code className="text-cyan-400 text-xs">turf.union()</code>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Centroid</h4>
              <p className="text-white/60 text-sm">Calculate geometric center of features</p>
              <code className="text-cyan-400 text-xs">turf.centroid()</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
