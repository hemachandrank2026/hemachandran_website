import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliation from '@/models/Affiliation';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const affiliation = await Affiliation.findByIdAndDelete(id);
  if (!affiliation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}

import { optimizeImageUrl } from '@/lib/optimizeImageUrl';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  if (body.img) {
    body.img = await optimizeImageUrl(body.img);
  }
  const updated = await Affiliation.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
