import { NextResponse } from 'next/server';
import { ModelVersion } from '@/app/hooks/useDemoStore';

interface GetFrameResponse {
  numSurfers: number,
  imageData: string,
}

interface ErrorResponse {
  error: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get('timestamp');
  const model: ModelVersion = (searchParams.get('model') as ModelVersion) || 'v1';

  if (!timestamp) {
    return NextResponse.json<ErrorResponse>({ error: 'Missing timestamp parameter' }, { status: 400 });
  }

  if (!model) {
    return NextResponse.json<ErrorResponse>({ error: 'Missing model parameter' }, { status: 400 });
  }

  if (!['v1', 'v2', 'v3'].includes(model)) {
    return NextResponse.json<ErrorResponse>({ error: 'Invalid model parameter' }, { status: 400 });
  }

  console.log('Model:', model);
  try {
    const timestampInSeconds = parseInt(timestamp, 10);
    if (isNaN(timestampInSeconds) || timestampInSeconds < 0) {
      return NextResponse.json<ErrorResponse>({ error: 'Invalid timestamp' }, { status: 400 });
    }

    const response = await fetch(process.env.API_BASE_URL + '/api/surfline/get-frame?' + new URLSearchParams({
        timestamp: timestamp.toString(),
    }).toString());
  
    const data = await response.json();
    const frameUrl = (data.frameUrl);
    const annotatedResponse = await annotateImage(frameUrl, model);

    const responseData: GetFrameResponse = {
      numSurfers: annotatedResponse.outputs[0].count_objects,
      imageData: annotatedResponse.outputs[0].output_image.value
    };

    return NextResponse.json<GetFrameResponse>(responseData, { status: 200 });
  } catch (error) {
    console.error('Error generating frame URL:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Error generating annotated frame.' }, { status: 500 });
  }
}

async function annotateImage(imageUrl: string, model: ModelVersion) {
  const projectUrl = getProjectURLfromModel(model);
  if (!projectUrl) {
    throw new Error('Invalid model version');
  }
  console.log('Project URL:', projectUrl);
  const response = await fetch(`https://detect.roboflow.com/infer/workflows/${projectUrl}`, {
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

function getProjectURLfromModel(model: ModelVersion): string | undefined{
  switch (model) {
    case 'v1':
      return process.env.ROBOFLOW_PROJECT_UNIQUE_URL_V1;
    case 'v2':
      return process.env.ROBOFLOW_PROJECT_UNIQUE_URL_V2;
    case 'v3':
      return process.env.ROBOFLOW_PROJECT_UNIQUE_URL_V3;
    default:
      throw new Error('Invalid model version');
  }
}
