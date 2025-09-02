import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/book", label: "Book Session" },
  { href: "/peer-support", label: "Forum" },
  { href: "/resources", label: "Resources" },
  { href: "/analytics", label: "Analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4">
      <div className="mb-4 text-xs font-semibold uppercase text-gray-500">
        Navigation
      </div>
      <nav className="space-y-1">
        {items.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm hover:bg-gray-50",
              pathname === i.href && "bg-blue-50 text-blue-700"
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
