import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await list();
    return Response.json(response);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
