const BASE = "http://localhost:4000/api";

export async function getSummary(productId: string): Promise<import("../Types/rating").ReviewSummary> {
  const res = await fetch(`${BASE}/reviews/${productId}/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function getReviews(productId: string, page = 1, pageSize = 10) {
  const res = await fetch(`${BASE}/reviews/${productId}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json() as Promise<import("../Types/rating").ReviewList>;
}

export async function postReview(productId: string, payload: { user: string; rating: number; comment: string; }) {
  const res = await fetch(`${BASE}/reviews/${productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to post review");
  }
  return res.json() as Promise<import("../Types/rating").ReviewSummary>;
}
