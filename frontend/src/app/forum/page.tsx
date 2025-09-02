// src/app/forum/page.tsx
"use client";
import { useEffect, useState } from "react";
import ForumThread from "@/components/ForumThread";
import { api } from "@/lib/api";

type ThreadSummary = { _id: string; title: string; excerpt?: string; author?: string; createdAt?: string };

export default function ForumPage() {
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/peer-support/threads");
        setThreads(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Peer Support Forum</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <aside className="md:col-span-1">
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Threads</h3>
            {loading ? <div>Loading…</div> : (
              <ul className="space-y-2">
                {threads.map(t => (
                  <li key={t._id}>
                    <button onClick={() => setSelected(t._id)} className="w-full text-left hover:text-blue-600">
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section className="md:col-span-2">
          {selected ? <ForumThread threadId={selected} /> : <div className="card p-6">Select a thread to read and comment.</div>}
        </section>
      </div>
    </div>
  );
}
