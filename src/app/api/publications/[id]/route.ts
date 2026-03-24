import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Publication from '@/models/Publication';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const data = await request.json();
  const pub = await Publication.findByIdAndUpdate(id, data, { new: true });
  if (!pub) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(pub);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const pub = await Publication.findByIdAndDelete(id);
  if (!pub) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
