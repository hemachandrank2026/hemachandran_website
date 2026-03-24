import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<NextResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'portfolio',
          format: 'webp',
          transformation: [{ quality: 'auto', fetch_format: 'webp' }]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result?.secure_url }, { status: 200 }));
          }
        }
      );
      
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
