import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Resource = {
  _id: string;
  title: string;
  description: string;
  type: "video" | "audio" | "article" | "guide" | string;
  url: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="h-full">
      <CardHeader className="text-lg font-semibold">{resource.title}</CardHeader>
      <CardContent>
        <p className="mb-2 line-clamp-3 text-sm text-gray-700">{resource.description}</p>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize text-gray-700">
          {resource.type}
        </span>
      </CardContent>
      <CardFooter>
        <a href={resource.url} target="_blank" rel="noreferrer">
          <Button>Open</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
