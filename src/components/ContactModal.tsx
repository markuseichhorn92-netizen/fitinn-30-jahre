'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const FORM_URL = 'https://mein.studiopartner.de/b0a8bae3-dad0-4281-8279-dc0e4d0a15e6/form/contact'

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'form_redirect') {
        window.location.href = event.data.redirectUrl
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('message', handleMessage)
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('message', handleMessage)
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="relative w-full max-w-lg bg-background rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="text-lg font-bold font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
            Jetzt Kontakt aufnehmen
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe
          src={FORM_URL}
          className="w-full border-0"
          style={{ height: '700px' }}
        />
      </div>
    </div>
  )
}
