import type { APIRoute } from 'astro';
import { profileMarkdown } from '@/data/markdown';

export const GET: APIRoute = ({ site }) =>
  new Response(profileMarkdown('pt', site!), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
