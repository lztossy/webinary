'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      // Dispatch an event with the scan results
      window.dispatchEvent(new CustomEvent('scanComplete', { detail: result }))

      toast({
        title: "Success",
        description: "File scanned successfully!",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "An error occurred while scanning the file.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="file"
        onChange={handleFileChange}
        accept=".exe,.dll,.bin"
        disabled={isLoading}
      />
      <Button type="submit" disabled={!file || isLoading}>
        {isLoading ? 'Scanning...' : 'upload pe'}
      </Button>
    </form>
  )
}

