export const revalidate = 300;

export async function GET() {
  try {
    const res = await fetch('https://boxx.zatrovo.com/api/packs', {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json(
        { error: 'Upstream error', status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    return Response.json({ error: 'Fetch failed' }, { status: 502 });
  }
}
