import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-10">{title}</h1>
        <div className="prose prose-invert prose-sm max-w-none
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground
          [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-foreground
          [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-muted-foreground [&_ul]:space-y-1 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:text-muted-foreground [&_ol]:space-y-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:text-muted-foreground
          [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
          [&_strong]:text-foreground
          [&_table]:w-full [&_table]:text-sm [&_table]:mb-4
          [&_th]:text-left [&_th]:p-2 [&_th]:border-b [&_th]:border-border [&_th]:text-foreground
          [&_td]:p-2 [&_td]:border-b [&_td]:border-border/50 [&_td]:text-muted-foreground
        ">
          {children}
        </div>
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  )
}
