import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetPosts from "@/hooks/useGetPosts";
import Loading from "@/components/LoadingSpin";
import Post from "./Post";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { IPost } from "@/types";
import { useNavigate } from "react-router-dom";

export function FeedContainer() {
  const { loading, posts } = useGetPosts();
  const navigate = useNavigate();
  const gotoPostDetail = (post: IPost) => {
    navigate(`/${post.creator.username}/status/${post._id}`);
  };

  const getPost = (post: IPost) => {
    return (
      <Card
        onClick={() => gotoPostDetail(post)}
        className="p-4 my-2 border-r-0 border-none shadow-none hover:bg-gray-50 hover:cursor-pointer"
      >
        <Post key={post._id} post={post} />
      </Card>
    );
  };

  return (
    <Tabs defaultValue="forYou" className="w-full">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 py-2">
        <TabsList className="grid w-full grid-cols-2  ">
          <TabsTrigger value="forYou">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="forYou">
        <div className=" px-2 pb-8 sm:pb-0 ">
          {!loading ? (
            posts.map((post) => {
              return (
                <>
                  {getPost(post)}
                  <Separator />
                </>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </TabsContent>
      <TabsContent value="following">
        <div className=" px-2 pb-8 sm:pb-0 ">
          {!loading ? (
            posts.map((post) => {
              return (
                <>
                  {getPost(post)}
                  <Separator />
                </>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
