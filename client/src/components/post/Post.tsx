import { EllipsisIcon } from "lucide-react";

import { IPost } from "@/types";
import { getDateString } from "@/utils";
import PostInteractions from "./PostInteractions";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

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
    <>
      <div className="flex flex-row items-center gap-x-4">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src={post.creator?.avatar}
            alt={post.creator.firstName + " " + post.creator.lastName}
          />
          <AvatarFallback className="rounded-lg">
            {post.creator.firstName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {`${post.creator?.firstName} ${post.creator?.lastName}`}
            <span className="ml-1 text-sm text-gray-500">
              @{post.creator?.username}
            </span>
          </p>
          <p className="flex text-xs text-gray-500">
            {getDateString(post.createdAt)}
          </p>
        </div>
        <div className="actions ml-auto">
          <EllipsisIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="media max-h-80 my-2 grid grid-rows-2 grid-flow-col gap-1">
        {post.images.map((m: string, i: number) => (
          <div key={i} className={gridClass(post.images.length, i)}>
            <img
              src={m}
              className="rounded w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <PostInteractions />
    </>
  );
}
