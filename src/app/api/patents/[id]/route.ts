import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Patent from '@/models/Patent';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const patent = await Patent.findByIdAndDelete(id);
  if (!patent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const updated = await Patent.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
