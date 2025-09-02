"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Comment = { _id: string; author: string; content: string; createdAt: string };
type Thread = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
};

export default function ForumThread({ threadId }: { threadId: string }) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await api.get(`/peer-support/threads/${threadId}`);
    setThread(data);
  }

  useEffect(() => {
    load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  async function postComment() {
    const text = comment.trim();
    if (!text) return;
    setLoading(true);
    try {
      await api.post(`/peer-support/threads/${threadId}/comments`, { content: text });
      setComment("");
      await load();
    } catch {
      // handle error toast if you add one
    } finally {
      setLoading(false);
    }
  }

  if (!thread) return <div>Loading thread…</div>;

  return (
    <Card>
      <CardHeader className="text-lg font-semibold">{thread.title}</CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-800">{thread.content}</p>
        <div className="mb-4 text-xs text-gray-500">
          Posted by {thread.author} · {new Date(thread.createdAt).toLocaleString()}
        </div>

        <div className="mb-3 text-sm font-medium">Comments</div>
        <div className="space-y-3">
          {thread.comments.map(c => (
            <div key={c._id} className="rounded-lg border bg-gray-50 p-3">
              <div className="text-sm">{c.content}</div>
              <div className="mt-1 text-xs text-gray-500">
                {c.author} · {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
          {thread.comments.length === 0 && (
            <div className="text-sm text-gray-500">No comments yet.</div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Write a supportive comment…"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button onClick={postComment} disabled={loading}>
            {loading ? "Posting…" : "Post"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
