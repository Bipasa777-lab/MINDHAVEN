// types/resource.d.ts

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "pdf" | "link";
  url: string;
  tags: string[];
  createdAt: string;
}
