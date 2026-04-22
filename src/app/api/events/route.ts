import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  await dbConnect();
  const events = await Event.find({}).sort({ startDate: 1 });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const event = await Event.create(data);
  return NextResponse.json(event, { status: 201 });
}
