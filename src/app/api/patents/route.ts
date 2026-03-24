import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Patent from '@/models/Patent';

export async function GET() {
  await dbConnect();
  const patents = await Patent.find({}).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(patents);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const patent = await Patent.create(data);
  return NextResponse.json(patent, { status: 201 });
}
