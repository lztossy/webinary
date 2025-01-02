import FileUploadForm from '@/components/FileUploadForm'
import ResultDisplay from '@/components/ResultDisplay'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-green-500 underline">webinary</span> - web-based sig scanner
        </h1>
        <FileUploadForm />
        <ResultDisplay />
      </div>
    </main>
  )
}
