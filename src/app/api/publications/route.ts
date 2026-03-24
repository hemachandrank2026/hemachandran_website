import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Publication from '@/models/Publication';

export async function GET() {
  await dbConnect();
  const pubs = await Publication.find({}).sort({ createdAt: -1 });
  return NextResponse.json(pubs);
}

import { optimizeImageUrl } from '@/lib/optimizeImageUrl';

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  if (data.thumbnail) {
    data.thumbnail = await optimizeImageUrl(data.thumbnail);
  }
  const pub = await Publication.create(data);
  return NextResponse.json(pub, { status: 201 });
}
