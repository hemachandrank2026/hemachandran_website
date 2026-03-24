import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Seed an admin user
export async function POST(request: Request) {
  await dbConnect();
  const { username, password } = await request.json();

  const existing = await User.findOne({ username });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, passwordHash });

  return NextResponse.json({ message: 'Admin user created', id: user._id }, { status: 201 });
}
