import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface Comment {
  id: number;
  author: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
  content: string;
  date: string;
  replies?: Comment[];
}

const comments: Comment[] = [
  {
    id: 1,
    author: { name: "Alice Johnson", username: "alicej" },
    content: "This is such a great update. Loving the new features!",
    date: "Apr 30",
    replies: [
      {
        id: 2,
        author: { name: "Ben Carter", username: "bencarter" },
        content: "Agreed — especially the UI improvements. 🔥",
        date: "Apr 30",
      },
      {
        id: 3,
        author: { name: "Sara Lee", username: "saralee" },
        content: "Finally! Been waiting for this one. 🙌",
        date: "May 1",
      },
    ],
  },
];

function TweetComment({
  comment,
  isReply = false,
  showLine = false,
}: {
  comment: Comment;
  isReply?: boolean;
  showLine?: boolean;
}) {
  return (
    <div className="relative flex space-x-3">
      {/* Vertical line for thread */}
      {showLine && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-muted-foreground/30" />
      )}

      <div className="pt-1">
        <Avatar className="h-10 w-10">
          {comment.author.avatarUrl ? (
            <AvatarImage
              src={comment.author.avatarUrl}
              alt={comment.author.name}
            />
          ) : (
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{comment.author.name}</span>
          <span className="text-muted-foreground">
            @{comment.author.username}
          </span>
          <span className="text-muted-foreground text-xs">
            · {comment.date}
          </span>
        </div>

        <p className="text-sm mt-1">{comment.content}</p>

        <div className="mt-2 text-muted-foreground text-xs flex items-center gap-2 cursor-pointer hover:text-primary">
          <MessageCircle className="w-4 h-4" />
          Reply
        </div>

        {/* Render replies if they exist */}
        {comment.replies && (
          <div className="mt-6 space-y-6">
            {comment.replies.map((reply, index) => (
              <TweetComment
                key={reply.id}
                comment={reply}
                isReply
                showLine={index < comment.replies!.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TwitterThread() {
  return (
    <Card className="w-full max-w-2xl  mt-2 border-none shadow-none">
      <CardContent className="space-y-8">
        {comments.map((comment) => (
          <TweetComment key={comment.id} comment={comment} />
        ))}
      </CardContent>
    </Card>
  );
}
