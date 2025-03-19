import { NextResponse } from 'next/server';

interface GetFrameResponse {
  frameUrl: string,
}

interface ErrorResponse {
  error: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get('timestamp');

  if (!timestamp) {
    return NextResponse.json<ErrorResponse>({ error: 'Missing timestamp parameter' }, { status: 400 });
  }

  try {
    const timestampInSeconds = parseInt(timestamp, 10);
    if (isNaN(timestampInSeconds) || timestampInSeconds < 0) {
      return NextResponse.json<ErrorResponse>({ error: 'Invalid timestamp' }, { status: 400 });
    }

    const frameUrl = getCloudinaryUrl(timestampInSeconds);

    const responseData: GetFrameResponse = {
      frameUrl: frameUrl
    };

    return NextResponse.json<GetFrameResponse>(responseData, { status: 200 });
  } catch (error) {
    console.error('Error generating frame URL:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Error generating surfline frame' }, { status: 500 });
  }
}

function getCloudinaryUrl(timestamp: number): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_${timestamp}/${process.env.CLOUDINARY_VIDEO_NAME}.jpg`;
}
