import { EllipsisIcon, Eye, Heart, MessageCircle } from "lucide-react";
import { Card } from "../ui/card";

interface IPost {
  name: string;
  image: string;
  media: string[];
}
export default function Post({ post }: { post: IPost }) {
  const gridClass = (count: number, i: number) => {
    if (i == 0) {
      return count <= 3 ? "row-span-2" : "";
    } else if (i == 1) {
      return count == 2 ? "row-span-2" : "";
    } else {
      return "";
    }
  };
  return (
    <Card className="p-4 my-2">
      <div className="flex flex-row items-center gap-x-4">
        <img
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={post.image}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {post.name}
          </p>
          <p className="text-sm text-gray-500">2 hrs ago</p>
        </div>
        <div className="actions ml-auto">
          <EllipsisIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="post-content">Demo test</div>
      <div className="media max-h-80 my-2 grid grid-rows-2 grid-flow-col gap-1">
        {post.media.map((m: string, i: number) => (
          <div key={i} className={gridClass(post.media.length, i)}>
            <img
              src={m}
              className="rounded w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="post-actions flex gap-x-2 items-center">
        <div className="flex gap-x-1 items-center">
          <Heart className="h-5 w-5 hover:cursor-pointer" />
          <div className="text-sm">123</div>
        </div>
        <div className="flex gap-x-1 items-center">
          <MessageCircle className="h-5 w-5 hover:cursor-pointer" />
          <div className="text-sm">123</div>
        </div>
        <div className="flex gap-x-1 items-center">
          <Eye className="h-5 w-5 hover:cursor-pointer" />
          <div className="text-sm">123</div>
        </div>
      </div>
    </Card>
  );
}
