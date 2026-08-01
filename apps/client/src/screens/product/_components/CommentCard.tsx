"use client";

import { useAppSelector } from "@/shared/lib/store/hooks";
import { Comment } from "@/entities/product";
import { useCallback, useRef, useState } from "react";
import { StarIcon } from "./StarIcon";
import { selectIsAuthorized } from "@/entities/profile/model/selectors";
import { LoginRequiredModal } from "@/shared/ui/login-required-modal/ui";

interface Props {
  comment: Comment;
  onDelete?: (id: number) => void;
  onReply?: (commentId: number, text: string) => Promise<void>;
}

export function CommentCard({ comment, onDelete, onReply }: Props) {
  const { profile } = useAppSelector((state) => state.profile);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const {
    id,
    profile: commentProfile,
    description,
    rate,
    createdAt,
    replies,
  } = comment;

  const isMine = commentProfile?.id === profile?.id;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [replyDescription, setReplyDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleToggleReply = useCallback(() => {
    if (!isAuthorized) {
      setIsLoginModalOpen(true);

      return;
    }

    setReplyOpen((prev) => {
      if (!prev) {
        // focus textarea after transition starts
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
      return !prev;
    });
  }, []);

  const handleSubmitReply = useCallback(async () => {
    const trimmed = replyDescription.trim();
    if (!trimmed || !onReply) return;
    setSubmitting(true);

    try {
      await onReply(id, trimmed);
      setReplyDescription("");
      setReplyOpen(false);
    } finally {
      setSubmitting(false);
    }
  }, [replyDescription, onReply, id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmitReply();
      }
    },
    [handleSubmitReply],
  );

  const hasReplies = replies && replies.length > 0;

  return (
    <article className="bg-surface-container-lowest border border-outline-variant/30 p-8 hover:bg-surface-container-low transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white text-sm font-bold uppercase tracking-widest">
              {commentProfile?.name}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} filled={index < rate} />
            ))}
          </div>
        </div>
        <span className="text-on-surface-variant/50 text-xs uppercase tracking-widest">
          {formattedDate}
        </span>
      </div>

      {/* Body */}
      <div className="text-on-surface-variant text-base leading-relaxed mb-6">
        <p>{description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleReply}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
            replyOpen
              ? "text-white"
              : "text-on-surface-variant hover:text-white"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 17 4 12 9 7" />
            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
          </svg>
          REPLY
        </button>
        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />

        {hasReplies && (
          <>
            <span className="text-on-surface-variant/30 text-xs">•</span>
            <button
              onClick={() => setRepliesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors duration-300"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${repliesOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {replies.length} {replies.length === 1 ? "REPLY" : "REPLIES"}
            </button>
          </>
        )}

        {isMine && onDelete && (
          <>
            <span className="text-on-surface-variant/30 text-xs">•</span>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-red-500/70 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors hover:cursor-pointer"
            >
              DELETE
            </button>
          </>
        )}
      </div>

      {/* Reply form — animated */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          replyOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-outline-variant/20 pt-5">
            <textarea
              ref={textareaRef}
              value={replyDescription}
              onChange={(e) => setReplyDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={submitting}
              placeholder="Write your reply..."
              rows={3}
              className="w-full bg-surface-container border border-outline-variant/30 text-on-surface-variant placeholder:text-on-surface-variant/30 text-sm p-4 resize-none focus:outline-none focus:border-outline-variant/60 transition-colors duration-200 disabled:opacity-50"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-on-surface-variant/30 text-xs uppercase tracking-widest">
                Ctrl+Enter to send
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setReplyOpen(false);
                    setReplyDescription("");
                  }}
                  disabled={submitting}
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 hover:text-on-surface-variant transition-colors duration-200 disabled:opacity-30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={submitting || !replyDescription.trim()}
                  className="text-xs font-bold uppercase tracking-widest text-white border border-outline-variant/30 px-4 py-2 hover:bg-surface-container transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replies list — animated */}
      {hasReplies && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            repliesOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-outline-variant/20 pt-5 space-y-4">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex gap-4 pl-4 border-l-2 border-outline-variant/20"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">
                        {reply.profile.name}
                      </span>
                      <span className="text-on-surface-variant/40 text-xs uppercase tracking-widest">
                        {new Date(reply.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {reply.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
