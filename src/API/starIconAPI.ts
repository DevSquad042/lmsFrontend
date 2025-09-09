import axios from "axios";
import type { ReviewSummary, ReviewList } from "../Types/rating";

const BASE = "https://byway-hoce.onrender.com/api/review";

export async function getSummary(courseId: string): Promise<ReviewSummary> {
  const { data } = await axios.get(`${BASE}/courseAverage/${courseId}`);
  if (data.status !== 'success') {
    throw new Error('Failed to fetch summary');
  }
  return data.data;
}

export async function getReviews(courseId: string, page = 1, pageSize = 10): Promise<ReviewList> {
  const { data } = await axios.get<ReviewList>(`${BASE}/getReviews/${courseId}`, {
    params: { page, pageSize },
  });
  return data;
}

export async function postReview(courseId: string, payload: { user: string; rating: number; comment: string; }): Promise<ReviewSummary> {
  try {
    const { data } = await axios.post<ReviewSummary>(`${BASE}/addReview/${courseId}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Error posting review:" + err.message);
    }
   else throw new Error("Failed to post review");
  }
}

