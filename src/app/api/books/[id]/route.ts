import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

import { optimizeImageUrl } from '@/lib/optimizeImageUrl';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const data = await request.json();
  if (data.coverImage) {
    data.coverImage = await optimizeImageUrl(data.coverImage);
  }
  const book = await Book.findByIdAndUpdate(id, data, { new: true });
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(book);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
