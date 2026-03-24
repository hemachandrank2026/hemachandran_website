import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliation from '@/models/Affiliation';

export async function GET() {
  await dbConnect();
  const affiliations = await Affiliation.find({}).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(affiliations);
}

import { optimizeImageUrl } from '@/lib/optimizeImageUrl';

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  if (data.img) {
    data.img = await optimizeImageUrl(data.img);
  }
  const affiliation = await Affiliation.create(data);
  return NextResponse.json(affiliation, { status: 201 });
}
