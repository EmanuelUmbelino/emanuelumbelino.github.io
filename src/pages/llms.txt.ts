import type { APIRoute } from 'astro';
import { llmsIndex } from '@/data/markdown';

export const GET: APIRoute = ({ site }) =>
  new Response(llmsIndex(site!), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
