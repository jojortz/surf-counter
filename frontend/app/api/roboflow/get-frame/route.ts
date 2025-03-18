import { NextResponse } from 'next/server';
//load env vriables
import dotenv from 'dotenv';
dotenv.config();

interface GetFrameResponse {
  numSurfers: number,
  imageData: string,
}

interface GetFrameResponse {
  numSurfers: number;
  imageData: string;
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
    const annotatedResponse = await annotateImage(frameUrl);

    const responseData: GetFrameResponse = {
      numSurfers: annotatedResponse.outputs[0].count_objects,
      imageData: annotatedResponse.outputs[0].output_image.value
    };

    return NextResponse.json<GetFrameResponse>(responseData, { status: 200 });
  } catch (error) {
    console.error('Error generating frame URL:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Error generating frame' }, { status: 500 });
  }
}

function getCloudinaryUrl(timestamp: number): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_${timestamp}/${process.env.CLOUDINARY_VIDEO_NAME}.jpg`;
}

async function annotateImage(imageUrl: string) {
  const response = await fetch(`https://detect.roboflow.com/infer/workflows/${process.env.ROBOFLOW_PROJECT_UNIQUE_URL}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          api_key: process.env.ROBOFLOW_API_KEY,
          inputs: {
              "image": {"type": "url", "value": imageUrl}
          }
      })
  });

  const result = await response.json();
  return result;
}
