import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { UserCard } from "./user-card";

export default function Activity() {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-2 w-full min-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          placeholder="Search..."
          className="pl-10"
        />
      </div>
      <UserCard />
    </div>
  );
}
