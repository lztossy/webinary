'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ScanResult {
  matches: Array<{
    pattern: string
    offset: number
  }>
}

export default function ResultDisplay() {
  const [scanResults, setScanResults] = useState<ScanResult | null>(null)

  useEffect(() => {
    const handleScanComplete = (event: CustomEvent<ScanResult>) => {
      setScanResults(event.detail)
    }

    window.addEventListener('scanComplete', handleScanComplete as EventListener)

    return () => {
      window.removeEventListener('scanComplete', handleScanComplete as EventListener)
    }
  }, [])

  if (!scanResults) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Scan Results</CardTitle>
      </CardHeader>
      <CardContent>
        {scanResults.matches.length > 0 ? (
          <ul className="list-disc pl-5">
            {scanResults.matches.map((match, index) => (
              <li key={index}>
                Pattern: {match.pattern}, Offset: {match.offset}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </CardContent>
    </Card>
  )
}

