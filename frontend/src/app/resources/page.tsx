// src/app/resources/page.tsx
"use client";
import { useEffect, useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import { api } from "@/lib/api";
import type { Resource } from "@/types/resource";

export default function ResourcesPage() {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/resources");
        setItems(res.data || []);
      } catch (err) {
        console.error("Failed to load resources", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Psychoeducational Resources</h2>
      {loading ? <div>Loading…</div> : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map(r => (
            <ResourceCard key={r.id} resource={{
              _id: r.id,
              title: r.title,
              description: r.description,
              type: r.category,
              url: r.url
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
