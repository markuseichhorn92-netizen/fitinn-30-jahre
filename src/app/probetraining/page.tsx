'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'

const FORM_URL = 'https://mein.studiopartner.de/b0a8bae3-dad0-4281-8279-dc0e4d0a15e6/form/trial_calendar'

export default function ProbetrainingPage() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'form_redirect') {
        window.location.href = event.data.redirectUrl
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="h-[100svh] flex flex-col bg-background overflow-hidden">
      <Navbar />

      {/* iframe füllt den Rest, pt-16 für fixed Navbar */}
      <iframe
        src={FORM_URL}
        className="flex-1 w-full border-0 pt-16"
      />
    </div>
  )
}
