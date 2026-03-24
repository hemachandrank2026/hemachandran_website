import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await request.json();
  const book = await Book.findByIdAndUpdate(params.id, data, { new: true });
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(book);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const book = await Book.findByIdAndDelete(params.id);
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
