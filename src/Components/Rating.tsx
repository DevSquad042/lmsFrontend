import React, { useEffect, useMemo, useState } from "react";
import { getSummary, getReviews, postReview } from "../API/starIconAPI";
import type { Review, ReviewList, ReviewSummary } from "../Types/rating";
import { StarIcon } from "../assets/react-icon/StarIcon";
import "./ComponentStyles/Rating.css";

type Props = { courseId: string; userId?: string };

const ReviewSection: React.FC<Props> = ({ courseId, userId = "Guest" }) => {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [list, setList] = useState<ReviewList | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // form state
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pageSize = 10;

  async function load() {
    setLoading(true);
    const [s, l] = await Promise.all([getSummary(courseId), getReviews(courseId, page, pageSize)]);
    setSummary(s);
    setList(l);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [courseId, page]);

  const totalPages = useMemo(() => {
    if (!summary) return 1;
    return Math.max(1, Math.ceil(summary.total / pageSize));
  }, [summary]);

  async function submit() {
    if (!selected || !comment.trim()) return;
    setSubmitting(true);
    try {
      const s = await postReview(courseId, { user: userId, rating: selected, comment: comment.trim() });
      setSummary(s);
      setComment("");
      // refresh first page to show newest at top
      setPage(1);
      const l = await getReviews(courseId, 1, pageSize);
      setList(l);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !summary || !list) return <div>Loading reviews…</div>;

  return (
    <section className="review-section" aria-label="Product reviews">
      {/* Summary */}
      <h3>Customer Reviews</h3>
      <div className="summary-row">
        <div className="stars-inline" aria-label={`Average ${summary.average} out of 5`}>
          {[1,2,3,4,5].map(i => (
            <StarIcon key={i} filled={i <= Math.round(summary.average)} size={20} />
          ))}
        </div>
        <strong className="avg">{summary.average.toFixed(1)}</strong>
        <span className="total">({summary.total} {summary.total === 1 ? "review" : "reviews"})</span>
      </div>

      {/* Breakdown */}
      <div className="rating-bars">
        {[5,4,3,2,1].map(star => {
          const count = summary.breakdown[star] ?? 0;
          const pct = summary.total ? Math.round((count / summary.total) * 100) : 0;
          return (
            <div className="rating-bar" key={star}>
              <span className="bar-label">{star}★</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Review form */}
      <div className="review-form">
        <label className="form-label">Your rating</label>
        <div
          className="stars-inline"
          role="radiogroup"
          aria-label="Set your star rating"
          onMouseLeave={() => setHovered(null)}
        >
          {[1,2,3,4,5].map(star => {
            const filled = hovered !== null ? star <= hovered : selected !== null && star <= selected;
            return (
              <StarIcon
                key={star}
                filled={filled}
                size={28}
                onClick={() => setSelected(star)}
                onMouseEnter={() => setHovered(star)}
                ariaLabel={`${star} star`}
              />
            );
          })}
        </div>

        <label className="form-label" htmlFor="comment">Your review</label>
        <textarea
          id="comment"
          className="comment-input"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />

        <button className="submit-btn" disabled={!selected || !comment.trim() || submitting} onClick={submit}>
          {submitting ? "Submitting…" : (selected ? `Submit ${selected}★ review` : "Submit review")}
        </button>
      </div>

      {/* Reviews list */}
      <div className="review-list">
        {list.items.map((r: Review) => (
          <article key={r.id} className="review-item">
            <header className="review-header">
              <strong>{r.user}</strong>
              <div className="stars-inline">
                {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= r.rating} size={16} />)}
              </div>
            </header>
            <p className="review-text">{r.comment}</p>
            <small className="review-date">{new Date(r.created_at).toLocaleDateString()}</small>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page<=1} onClick={() => setPage(p => p-1)}>Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page>=totalPages} onClick={() => setPage(p => p+1)}>Next</button>
      </div>
    </section>
  );
};
export default ReviewSection;
