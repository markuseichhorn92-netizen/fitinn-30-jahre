'use client'

import { useEffect, useRef } from 'react'

const WIDGET_URL = 'https://mein.studiopartner.de/b0a8bae3-dad0-4281-8279-dc0e4d0a15e6/form/whatsapp_widget'
const WIDGET_ORIGIN = 'https://mein.studiopartner.de'

export function WhatsAppWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.origin !== WIDGET_ORIGIN &&
        !event.origin.includes('127.0.0.1') &&
        !event.origin.includes('localhost')
      ) return
      if (!event.data || event.data.type !== 'SP_WIDGET_RESIZE') return

      const iframe = iframeRef.current
      if (!iframe) return

      const isMobile = window.innerWidth <= 480
      const size = event.data

      if (size.width > 150) {
        if (isMobile) {
          iframe.style.width = Math.min(420, window.innerWidth - 20) + 'px'
          iframe.style.height = Math.min(580, window.innerHeight * 0.85) + 'px'
          iframe.style.right = '10px'
          iframe.style.bottom = '10px'
        } else {
          iframe.style.width = '420px'
          iframe.style.height = '580px'
          iframe.style.right = '20px'
          iframe.style.bottom = '20px'
        }
      } else {
        iframe.style.width = '90px'
        iframe.style.height = '90px'
        iframe.style.right = isMobile ? '15px' : '20px'
        iframe.style.bottom = isMobile ? '15px' : '20px'
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={WIDGET_URL}
      allow="clipboard-write"
      scrolling="no"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 90,
        height: 90,
        border: 'none',
        background: 'transparent',
        zIndex: 999999,
        transition: 'all 0.3s ease',
      }}
    />
  )
}
