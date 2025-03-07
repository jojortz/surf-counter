import axios from 'axios';
//load env variables
import dotenv from 'dotenv';
dotenv.config();

interface SurferCountResponse {
  count_objects: number;
  image_data: string;
}

export const getSurferCount = async (): Promise<SurferCountResponse> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/get-count');

    console.log('Response:', response.data);
    
    const { count_objects, output_image } = response.data;

    return { count_objects, image_data: output_image };
  } catch (error) {
    console.error('Error fetching surfer count and image data:', error);
    throw error;
  }
};
