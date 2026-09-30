// Ersatz für das Onepage-CRM: Buchungen werden zusätzlich (nach erfolgreicher
// Magicline-Buchung) an /api/lead geschickt, das eine E-Mail an das Team sendet.
export const crm = {
  async submitForm({ formId, data }: { formId: string; data: Record<string, unknown> }) {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId, data }),
      keepalive: true,
    });
    if (!res.ok) throw new Error('lead_failed');
    return true;
  },
};
