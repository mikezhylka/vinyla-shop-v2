"use client";

import { createComment } from "@/entities/product/api/create-comment";
import { Comment } from "@/entities/product";
import { SubmitEvent, useCallback, useEffect, useState } from "react";
import { StarIcon } from "./StarIcon";

const STARS = [1, 2, 3, 4, 5];

interface CommentFormProps {
  productId: number;
  productName: string;
  productPhoto: string;
  onSuccess?: (comment: Comment) => void;
  onCancel?: () => void;
}

export function CommentForm({
  productId,
  productName,
  productPhoto,
  onSuccess,
  onCancel,
}: CommentFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    //iOS and Safari fix
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleStarHover = useCallback((val: number) => setHoverRating(val), []);
  const handleStarClick = useCallback((val: number) => setRating(val), []);
  const handleStarLeave = useCallback(() => setHoverRating(0), []);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createComment(productId, {
        rate: rating,
        description,
      });

      if (result.success && result.data) {
        setRating(0);
        setDescription("");
        if (onSuccess) onSuccess(result.data);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="max-h-screen fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className={`w-full max-w-3xl bg-surface-container-lowest border border-outline-variant/30 p-10 sm:p-16 relative flex flex-col items-center shadow-2xl overflow-y-auto max-h-[90vh]
          
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-outline-variant/50
            /* Chrome, Edge, Safari */
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-outline-variant/50
            hover:[&::-webkit-scrollbar-thumb]:bg-white/40
            [&::-webkit-scrollbar-thumb]:transition-colors`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Product Info */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-3">
            WRITE A REVIEW
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-outline-variant/30">
              <img
                alt={productName}
                className="w-full h-full object-cover"
                src={productPhoto}
              />
            </div>
            <h2 className="font-medium text-base text-on-surface-variant text-center max-w-62.5 truncate">
              {productName}
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          {/* Rating */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
              RATING
            </label>
            <div className="flex gap-1 text-[#f2ca50]">
              {STARS.map((starValue) => (
                <StarIcon
                  key={starValue}
                  value={starValue}
                  filled={starValue <= (hoverRating || rating)}
                  onHover={handleStarHover}
                  onClick={handleStarClick}
                  onLeave={handleStarLeave}
                  className={`w-8 h-8 ${
                    starValue <= (hoverRating || rating)
                      ? "text-[#f2ca50]"
                      : "text-white/20 hover:text-[#f2ca50]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Body */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="review-body"
              className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant"
            >
              YOUR REVIEW
            </label>
            <textarea
              id="review-body"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you think about the pressing quality..."
              rows={5}
              className="bg-transparent border border-outline-variant/30 p-4 text-white focus:border-white/40 focus:ring-0 transition-colors text-sm placeholder:text-on-surface-variant/30 resize-none outline-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-4 bg-transparent text-white text-[12px] font-bold uppercase tracking-[0.15em] border border-white/20 hover:border-white transition-colors duration-300 disabled:opacity-50 hover:cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full sm:flex-1 py-4 bg-white text-black text-[12px] font-bold uppercase tracking-[0.15em] border border-white hover:bg-transparent hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
