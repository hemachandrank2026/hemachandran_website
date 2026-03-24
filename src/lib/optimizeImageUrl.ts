import cloudinary from './cloudinary';

export async function optimizeImageUrl(url: string | undefined): Promise<string | undefined> {
  if (!url) return url;
  if (url.includes('res.cloudinary.com')) return url;

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: 'portfolio',
      format: 'webp',
      transformation: [{ quality: 'auto', fetch_format: 'webp' }]
    });
    return result.secure_url;
  } catch (error) {
    console.error('Failed to optimize external URL to Cloudinary WebP:', error);
    return url;
  }
}
