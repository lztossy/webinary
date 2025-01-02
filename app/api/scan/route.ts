import { NextRequest, NextResponse } from 'next/server'
import { scanBinary } from '@/lib/scanner'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    const results = await scanBinary(uint8Array)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: 'Error processing file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

