"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Calculator, Zap, Target, Search, Download, Upload } from "lucide-react"

interface Place {
  name: string
  coordinates: [number, number]
  type: string
}

export default function AdvancedTurfDemo() {
  const [mounted, setMounted] = useState(false)
  const [turf, setTurf] = useState<any>(null)
  const [selectedOperation, setSelectedOperation] = useState("buffer")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [bufferDistance, setBufferDistance] = useState(1)
  const [results, setResults] = useState<any>(null)
  const [geoJsonInput, setGeoJsonInput] = useState("")
  const [analysisPoints, setAnalysisPoints] = useState<Place[]>([])

  useEffect(() => {
    let mounted = true

    const loadTurf = async () => {
      try {
        const turfModule = await import("@turf/turf")
        if (mounted) {
          setTurf(turfModule)
          setMounted(true)
        }
      } catch (error) {
        console.error("Failed to load Turf.js:", error)
        if (mounted) {
          setMounted(true) // Still set mounted to show the UI
        }
      }
    }

    loadTurf()

    return () => {
      mounted = false
    }
  }, [])

  // Predefined places in Nepal and surrounding areas
  const places: Place[] = [
    { name: "Kathmandu", coordinates: [85.324, 27.7172], type: "Capital" },
    { name: "Pokhara", coordinates: [83.9856, 28.2096], type: "City" },
    { name: "Chitwan", coordinates: [84.4277, 27.5291], type: "District" },
    { name: "Bhaktapur", coordinates: [85.4298, 27.671], type: "City" },
    { name: "Lalitpur", coordinates: [85.324, 27.6588], type: "City" },
    { name: "Biratnagar", coordinates: [87.2718, 26.4525], type: "City" },
    { name: "Dharan", coordinates: [87.2799, 26.8147], type: "City" },
    { name: "Butwal", coordinates: [83.4484, 27.7025], type: "City" },
    { name: "Nepalgunj", coordinates: [81.6167, 28.05], type: "City" },
    { name: "Janakpur", coordinates: [85.9244, 26.7288], type: "City" },
    { name: "Mount Everest", coordinates: [86.925, 27.9881], type: "Peak" },
    { name: "Annapurna Base Camp", coordinates: [83.8719, 28.5312], type: "Trekking" },
    { name: "Lumbini", coordinates: [83.2767, 27.4833], type: "Heritage" },
    { name: "Dhulikhel", coordinates: [85.5442, 27.6219], type: "Municipality" },
  ]

  const filteredPlaces = places.filter((place) => place.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const spatialOperations = [
    { id: "buffer", name: "Buffer Analysis", icon: Target },
    { id: "distance", name: "Distance Calculation", icon: Calculator },
    { id: "area", name: "Area Measurement", icon: MapPin },
    { id: "intersection", name: "Intersection Analysis", icon: Zap },
    { id: "convexHull", name: "Convex Hull", icon: Target },
    { id: "centroid", name: "Centroid Calculation", icon: MapPin },
    { id: "pointInPolygon", name: "Point in Polygon", icon: Search },
    { id: "nearestPoint", name: "Nearest Point", icon: Calculator },
  ]

  const performSpatialAnalysis = () => {
    if (!turf || (!selectedPlace && analysisPoints.length === 0)) return

    let result: any = null

    try {
      switch (selectedOperation) {
        case "buffer":
          if (selectedPlace) {
            const point = turf.point(selectedPlace.coordinates)
            const buffer = turf.buffer(point, bufferDistance, { units: "kilometers" })
            result = {
              type: "Buffer Analysis",
              place: selectedPlace.name,
              distance: bufferDistance,
              area: Math.round((turf.area(buffer) / 1000000) * 100) / 100,
              geometry: buffer,
            }
          }
          break

        case "distance":
          if (analysisPoints.length >= 2) {
            const point1 = turf.point(analysisPoints[0].coordinates)
            const point2 = turf.point(analysisPoints[1].coordinates)
            const distance = turf.distance(point1, point2, { units: "kilometers" })
            result = {
              type: "Distance Calculation",
              from: analysisPoints[0].name,
              to: analysisPoints[1].name,
              distance: Math.round(distance * 100) / 100,
            }
          }
          break

        case "area":
          if (analysisPoints.length >= 3) {
            const coordinates = [...analysisPoints.map((p) => p.coordinates), analysisPoints[0].coordinates]
            const polygon = turf.polygon([coordinates])
            const area = turf.area(polygon)
            result = {
              type: "Area Measurement",
              points: analysisPoints.length,
              area: Math.round((area / 1000000) * 100) / 100,
              perimeter: Math.round((turf.length(polygon, { units: "kilometers" }) * 100) / 100),
            }
          }
          break

        case "convexHull":
          if (analysisPoints.length >= 3) {
            const points = turf.featureCollection(analysisPoints.map((p) => turf.point(p.coordinates)))
            const hull = turf.convex(points)
            if (hull) {
              result = {
                type: "Convex Hull",
                points: analysisPoints.length,
                area: Math.round((turf.area(hull) / 1000000) * 100) / 100,
                geometry: hull,
              }
            }
          }
          break

        case "centroid":
          if (analysisPoints.length >= 2) {
            const points = turf.featureCollection(analysisPoints.map((p) => turf.point(p.coordinates)))
            const center = turf.centroid(points)
            result = {
              type: "Centroid Calculation",
              points: analysisPoints.length,
              centroid: center.geometry.coordinates,
              coordinates: `${center.geometry.coordinates[1].toFixed(4)}°N, ${center.geometry.coordinates[0].toFixed(4)}°E`,
            }
          }
          break

        case "nearestPoint":
          if (selectedPlace && analysisPoints.length > 0) {
            const targetPoint = turf.point(selectedPlace.coordinates)
            const points = turf.featureCollection(analysisPoints.map((p) => turf.point(p.coordinates)))
            const nearest = turf.nearestPoint(targetPoint, points)
            const nearestPlace = analysisPoints[nearest.properties.featureIndex]
            const distance = turf.distance(targetPoint, nearest, { units: "kilometers" })
            result = {
              type: "Nearest Point Analysis",
              target: selectedPlace.name,
              nearest: nearestPlace.name,
              distance: Math.round(distance * 100) / 100,
            }
          }
          break
      }

      setResults(result)
    } catch (error) {
      console.error("Analysis error:", error)
      setResults({ error: "Analysis failed. Please check your inputs." })
    }
  }

  const addToAnalysis = (place: Place) => {
    if (!analysisPoints.find((p) => p.name === place.name)) {
      setAnalysisPoints([...analysisPoints, place])
    }
  }

  const removeFromAnalysis = (placeName: string) => {
    setAnalysisPoints(analysisPoints.filter((p) => p.name !== placeName))
  }

  const exportResults = () => {
    if (results && typeof window !== "undefined") {
      const dataStr = JSON.stringify(results, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `spatial_analysis_${selectedOperation}_${Date.now()}.json`
      link.click()
    }
  }

  const processGeoJSON = () => {
    if (!turf) return

    try {
      const geoJson = JSON.parse(geoJsonInput)
      if (geoJson.type === "FeatureCollection") {
        const area = turf.area(geoJson)
        const bbox = turf.bbox(geoJson)
        setResults({
          type: "GeoJSON Analysis",
          features: geoJson.features.length,
          area: Math.round((area / 1000000) * 100) / 100,
          bbox: bbox,
        })
      }
    } catch (error) {
      setResults({ error: "Invalid GeoJSON format" })
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-8">
        <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search and Place Selection */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Place Search & Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="search" className="text-white/80">
                Search Places in Nepal
              </Label>
              <Input
                id="search"
                placeholder="Search for cities, districts, landmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-cyan-500/30 text-white mb-4"
              />
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.name}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <span className="text-white font-medium">{place.name}</span>
                      <span className="text-cyan-400 text-sm ml-2">({place.type})</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPlace(place)}
                        className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                      >
                        Select
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToAnalysis(place)}
                        className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white/80">Selected for Analysis</Label>
              <div className="space-y-2 mt-2">
                {selectedPlace && (
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-cyan-400 font-medium">Primary: {selectedPlace.name}</span>
                        <p className="text-white/60 text-sm">
                          {selectedPlace.coordinates[1].toFixed(4)}°N, {selectedPlace.coordinates[0].toFixed(4)}°E
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedPlace(null)}
                        className="text-red-400 hover:bg-red-400/10"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                {analysisPoints.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-white/60 text-sm">Analysis Points ({analysisPoints.length})</Label>
                    {analysisPoints.map((point) => (
                      <div
                        key={point.name}
                        className="flex justify-between items-center p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                      >
                        <span className="text-blue-400 text-sm">{point.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromAnalysis(point.name)}
                          className="text-red-400 hover:bg-red-400/10 h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spatial Operations */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Spatial Analysis Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white/80">Select Operation</Label>
              <Select value={selectedOperation} onValueChange={setSelectedOperation}>
                <SelectTrigger className="bg-white/10 border-cyan-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-cyan-500/30">
                  {spatialOperations.map((op) => (
                    <SelectItem key={op.id} value={op.id} className="text-white hover:bg-white/10">
                      <div className="flex items-center">
                        <op.icon className="w-4 h-4 mr-2" />
                        {op.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedOperation === "buffer" && (
                <div className="mt-4">
                  <Label className="text-white/80">Buffer Distance (km)</Label>
                  <Input
                    type="number"
                    min="0.1"
                    max="100"
                    step="0.1"
                    value={bufferDistance}
                    onChange={(e) => setBufferDistance(Number.parseFloat(e.target.value))}
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
              )}

              <Button
                onClick={performSpatialAnalysis}
                disabled={!turf}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 mt-4 w-full disabled:opacity-50"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {turf ? "Perform Analysis" : "Loading Turf.js..."}
              </Button>
            </div>

            <div>
              <Label className="text-white/80">Operation Requirements</Label>
              <div className="mt-2 p-4 bg-white/5 rounded-lg">
                {selectedOperation === "buffer" && <p className="text-white/70 text-sm">Requires: 1 selected place</p>}
                {selectedOperation === "distance" && (
                  <p className="text-white/70 text-sm">Requires: 2 analysis points</p>
                )}
                {selectedOperation === "area" && (
                  <p className="text-white/70 text-sm">Requires: 3+ analysis points (forms polygon)</p>
                )}
                {selectedOperation === "convexHull" && (
                  <p className="text-white/70 text-sm">Requires: 3+ analysis points</p>
                )}
                {selectedOperation === "centroid" && (
                  <p className="text-white/70 text-sm">Requires: 2+ analysis points</p>
                )}
                {selectedOperation === "nearestPoint" && (
                  <p className="text-white/70 text-sm">Requires: 1 selected place + 1+ analysis points</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {results && (
        <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              Analysis Results
              <Button
                size="sm"
                variant="outline"
                onClick={exportResults}
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{results.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">{results.type}</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(results).map(([key, value]) => {
                        if (key === "type" || key === "geometry") return null
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                            <span className="text-cyan-400 font-mono">
                              {typeof value === "number" ? value : String(value)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {results.geometry && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Geometry</h4>
                      <pre className="bg-black/50 p-3 rounded-lg text-xs text-green-400 overflow-x-auto max-h-40">
                        {JSON.stringify(results.geometry, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* GeoJSON Input */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            GeoJSON Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Paste GeoJSON Data</Label>
              <Textarea
                placeholder='{"type": "FeatureCollection", "features": [...]}'
                value={geoJsonInput}
                onChange={(e) => setGeoJsonInput(e.target.value)}
                className="bg-white/10 border-cyan-500/30 text-white h-32 font-mono text-sm"
              />
            </div>
            <Button
              onClick={processGeoJSON}
              disabled={!turf}
              variant="outline"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent disabled:opacity-50"
            >
              {turf ? "Analyze GeoJSON" : "Loading Turf.js..."}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Live Code Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Current Operation Code</h4>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {selectedOperation === "buffer" &&
                  `// Buffer Analysis
const point = turf.point([${selectedPlace?.coordinates[0] || "lng"}, ${selectedPlace?.coordinates[1] || "lat"}]);
const buffer = turf.buffer(point, ${bufferDistance}, {units: 'kilometers'});
const area = turf.area(buffer); // Result in square meters`}

                {selectedOperation === "distance" &&
                  `// Distance Calculation
const point1 = turf.point([lng1, lat1]);
const point2 = turf.point([lng2, lat2]);
const distance = turf.distance(point1, point2, {units: 'kilometers'});`}

                {selectedOperation === "area" &&
                  `// Area Calculation
const coordinates = [[lng1,lat1], [lng2,lat2], [lng3,lat3], [lng1,lat1]];
const polygon = turf.polygon([coordinates]);
const area = turf.area(polygon); // Square meters
const perimeter = turf.length(polygon, {units: 'kilometers'});`}

                {selectedOperation === "convexHull" &&
                  `// Convex Hull
const points = turf.featureCollection([
  turf.point([lng1, lat1]),
  turf.point([lng2, lat2]),
  turf.point([lng3, lat3])
]);
const hull = turf.convex(points);`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
