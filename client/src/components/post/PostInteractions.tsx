import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ChartNoAxesColumn,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
export default function PostInteractions() {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center group hover:text-blue-500">
        <Button
          className="rounded-full group-hover:bg-blue-100"
          variant="action"
          size="icon"
        >
          <MessageCircle />
        </Button>
        <div className="">44</div>
      </div>
      <div className="flex items-center group hover:text-pink-500">
        <Button
          className="rounded-full group-hover:bg-pink-100"
          variant="action"
          size="icon"
        >
          <Heart />
        </Button>
        <div>45</div>
      </div>
      <div className="flex items-center group hover:text-blue-500">
        <Button
          className="rounded-full group-hover:bg-blue-100"
          variant="action"
          size="icon"
        >
          <ChartNoAxesColumn />
        </Button>
        <div> 45</div>
      </div>

      <div className="flex items-center gap-x-2">
        <Button
          className="rounded-full hover:bg-blue-100 hover:text-blue-500"
          variant="action"
          size="icon"
        >
          <Bookmark />
        </Button>
        <Button
          className="rounded-full hover:bg-blue-100 hover:text-blue-500"
          variant="action"
          size="icon"
        >
          <Share />
        </Button>
      </div>
    </div>
  );
}
