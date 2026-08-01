"use client";

import { deleteComment } from "@/entities/product/api/delete-comment";
import { replyOnComment } from "@/entities/product/api/reply-on-comment";
import { Comment } from "@/entities/product";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommentCard } from "./CommentCard";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { Pagination } from "./Pagination";
import { StarIcon } from "./StarIcon";

const REVIEWS_PER_PAGE = 4;

interface Props {
  productId: number;
  comments: Comment[];
  setOptimisticComments: Dispatch<SetStateAction<Comment[]>>;
  onDeleteSuccess: (id: number) => void;
  reviewsSectionRef: RefObject<HTMLElement | null>;
}

export function ProductReviews({
  productId,
  comments,
  setOptimisticComments,
  onDeleteSuccess,
  reviewsSectionRef,
}: Props) {
  const rootComments = useMemo(
    () => comments.filter((comment) => comment.parentId === null),
    [comments],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const stats = useMemo(() => {
    const total = rootComments.length;
    if (total === 0) return { total: 0, average: "0.0" };
    const sum = rootComments.reduce((acc, c) => acc + c.rate, 0);
    return { total, average: (sum / total).toFixed(1) };
  }, [rootComments]);

  const totalPages = Math.ceil(rootComments.length / REVIEWS_PER_PAGE);

  const paginatedComments = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    return rootComments.slice(start, start + REVIEWS_PER_PAGE);
  }, [rootComments, currentPage]);

  const scrollToTop = useCallback(() => {
    const el = reviewsSectionRef.current;
    if (!el) return;
    const header = document.getElementById("page-header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const GAP = 16;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - GAP;
    window.scrollTo({ top, behavior: "smooth" });
  }, [reviewsSectionRef]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages, scrollToTop],
  );

  const handleDelete = useCallback((id: number) => {
    setPendingDeleteId(id);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (pendingDeleteId === null) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    setDeletingId(id);

    const result = await deleteComment(id);
    if (result.success) {
      onDeleteSuccess(id);
      if (paginatedComments.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        scrollToTop();
      }
    } else {
      alert("Could not delete comment");
    }
    setDeletingId(null);
  }, [
    pendingDeleteId,
    onDeleteSuccess,
    paginatedComments.length,
    currentPage,
    scrollToTop,
  ]);

  const handleCancelDelete = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const handleReply = useCallback(
    async (parentId: number, text: string) => {
      const result = await replyOnComment(productId, parentId, text);

      if (result.success) {
        setOptimisticComments((prev) =>
          prev.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  replies: [...(comment.replies ?? []), result.data],
                }
              : comment,
          ),
        );
      }
    },
    [productId],
  );

  if (stats.total === 0) {
    return (
      <p className="text-on-surface-variant italic border border-outline-variant/20 p-8 text-center bg-surface-container-lowest">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <>
      <DeleteConfirmModal
        isOpen={pendingDeleteId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
          <div className="flex gap-1">
            <StarIcon filled />
          </div>
          <span className="text-base">
            Average rate{" "}
            <span className="text-white font-bold">{stats.average}</span> based
            on {stats.total} {stats.total === 1 ? "review" : "reviews"}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {paginatedComments.map((comment) => {
            // don't render replies on the first level of reviews
            if (!comment.parentId) {
              return (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={
                    deletingId !== comment.id ? handleDelete : undefined
                  }
                  onReply={handleReply}
                />
              );
            }
          })}
        </div>
        <div className="flex justify-center mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
