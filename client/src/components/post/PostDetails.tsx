import { useParams } from "react-router-dom";
import ReplyContainer from "./ReplyContainer";
import useGetPostDetails from "@/hooks/useGetPostDetails";
import Post from "./Post";
import LoadingSpin from "@/components/LoadingSpin";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Comments from "@/components/post/Comments";

export default function PostDetails() {
  const { postId } = useParams();

  const { post, loading } = useGetPostDetails(postId || "");
  return (
    <div className="mx-2 ">
      {!loading && Object.keys(post).length && (
        <Card className="p-4 border-r-0 border-none shadow-none ">
          <Post post={post} />
        </Card>
      )}
      {loading && <LoadingSpin />}
      <Separator />
      <ReplyContainer />
      <Separator />
      <Comments />
    </div>
  );
}
