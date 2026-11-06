import type { NextRequest } from 'next/server';
import { fitInnApp } from '@/lib/start-config';
import { storeRedirect } from '@/lib/store-redirect';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  return storeRedirect(req, fitInnApp!);
}
