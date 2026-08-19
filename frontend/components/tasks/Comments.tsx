"use client";

import { MessageCircle, Send, Trash2 } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface CommentsProps {
  initialComments?: Comment[];
}

export default function Comments({
  initialComments = [],
}: CommentsProps) {
  const [comments, setComments] =
    useState<Comment[]>(initialComments);

  const [comment, setComment] = useState("");

  const addComment = () => {
    const text = comment.trim();

    if (!text) {
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Admin",
      text,
      createdAt: "Just now",
    };

    setComments((current) => [...current, newComment]);
    setComment("");
  };

  const deleteComment = (id: string) => {
    setComments((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle
          size={17}
          className="text-gray-400"
        />

        <h2 className="text-sm font-semibold text-gray-900">
          Comments
        </h2>

        {comments.length > 0 && (
          <span className="text-xs text-gray-400">
            {comments.length}
          </span>
        )}
      </div>

      {/* Comments */}
      <div className="mt-3 space-y-3">
        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                  {item.author.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {item.author}
                    </span>

                    <span className="text-[11px] text-gray-400">
                      {item.createdAt}
                    </span>
                  </div>

                  <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    deleteComment(item.id)
                  }
                  className="rounded-md p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete comment"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-400">
              No comments yet.
            </p>
          </div>
        )}
      </div>

      {/* Add comment */}
      <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3">
        <textarea
          value={comment}
          onChange={(event) =>
            setComment(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              addComment();
            }
          }}
          placeholder="Write a comment..."
          rows={3}
          className="w-full resize-none text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-[11px] text-gray-400">
            Press Enter to add
          </span>

          <button
            type="button"
            onClick={addComment}
            disabled={!comment.trim()}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={13} />
            Add Comment
          </button>
        </div>
      </div>
    </section>
  );
}