// components/ProfilePage.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  BellPlus,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  Link,
  Mail,
  MapPin,
  Pencil,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import LoadingSpin from "@/components/LoadingSpin";
import { useAuthContext } from "@/context/AuthContext";

const tweets = [
  { id: 1, content: "Just launched my new project 🚀", date: "1h ago" },
  { id: 2, content: "Learning ShadCN is fun!", date: "3h ago" },
  { id: 3, content: "Learning ShadCN is fun!", date: "3h ago" },
  { id: 4, content: "Learning ShadCN is fun!", date: "3h ago" },
  { id: 5, content: "Learning ShadCN is fun!", date: "8h ago" },
];

export default function ProfilePage() {
  const { username } = useParams();
  const followRef = useRef<HTMLButtonElement>(null);
  const [isFollowOutOfView, setIsFollowOutOfView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { user, loading } = useGetUserProfile(username || "");
  const { authUser } = useAuthContext();
  const onMouseEnter = (val: boolean) => {
    setTimeout(() => {
      setHovered(val);
    }, 600);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFollowOutOfView(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (followRef.current) {
      observer.observe(followRef.current);
    }

    return () => {
      if (followRef.current) {
        observer.unobserve(followRef?.current);
      }
    };
  }, []);

  if (loading) {
    return <LoadingSpin />;
  } else {
    return (
      <div className="h-full w-full">
        <div className="flex flex-row gap-3 items-center py-3 sticky top-0 bg-white z-30">
          <Button className="rounded-full" variant="ghost">
            <ChevronLeft />
          </Button>
          <div>{`${user.firstName} ${user.lastName}`}</div>
          {isFollowOutOfView}
          {isFollowOutOfView && authUser?.username !== username && (
            <Button
              className="rounded-full ml-auto "
              variant={
                hovered && user?.isFollowing ? "destructive1" : "outline"
              }
              onMouseEnter={() => onMouseEnter(true)}
              onMouseLeave={() => onMouseEnter(false)}
            >
              {user?.isFollowing
                ? hovered
                  ? "Unfollow"
                  : "Following"
                : "Follow"}
            </Button>
          )}
        </div>
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {/* Profile Header */}
        <div className="relative -mt-14 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/profile.jpg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            {authUser?.username !== username ? (
              <div className="flex gap-2 self-end">
                <Button className="rounded-full" variant="outline" size="icon">
                  <BellPlus />
                </Button>
                <Button className="rounded-full" variant="outline" size="icon">
                  <Mail />
                </Button>
                <Button
                  ref={followRef}
                  className="rounded-full sticky top-0 z-40 "
                  variant={
                    hovered && user?.isFollowing ? "destructive1" : "outline"
                  }
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {user?.isFollowing
                    ? hovered
                      ? "Unfollow"
                      : "Following"
                    : "Follow"}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="rounded-full self-end font-bold"
              >
                <Pencil />
                Edit Profile
              </Button>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex-flex-col">
              <div className="font-bold text-2xl">{`${user.firstName} ${user.lastName}`}</div>
              <div className="text-gray-700">@{username}</div>
            </div>
            <div className="text-sm">
              Web developer. Coffee lover ☕. Tweets are my own.
            </div>
            <div className="flex flex-row gap-3 flex-wrap text-gray-600 text-sm">
              <div className="flex gap-1 items-center">
                <BriefcaseBusiness className="w-4 h-4" />

                <div>Science & Technology</div>
              </div>
              <div className="flex gap-1 items-center">
                <MapPin className="w-4 h-4" />

                <div>India</div>
              </div>
              <div className="flex gap-1 items-center">
                <Link className="w-4 h-4" />

                <div>app.com</div>
              </div>
              <div className="flex gap-1 items-center">
                <CalendarDays className="w-4 h-4" />

                <div>Joined June 2018</div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <div className=" font-bold">{user.followings?.length}</div>
                <div className="text-gray-600 text-sm">Followings</div>
              </div>
              <div className="flex gap-1 items-center">
                <div className=" font-bold">{user.followers?.length}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
            </div>
            <div className="text-gray-600 text-xs">
              Not followed by anyone you’re following
            </div>
          </div>
        </div>

        <Tabs defaultValue="tweets" className="mt-6 ">
          <TabsList className="grid w-full grid-cols-3 sticky top-15">
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>
          <TabsContent value="tweets">
            <div className="space-y-4 mt-4">
              {tweets.map((tweet) => (
                <Card key={tweet.id}>
                  <CardContent className="p-4">
                    <p>{tweet.content}</p>
                    <span className="text-sm text-muted-foreground">
                      {tweet.date}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="media">
            <p className="text-center text-gray-500 mt-4">No media yet.</p>
          </TabsContent>
          <TabsContent value="likes">
            <p className="text-center text-gray-500 mt-4">
              No liked tweets yet.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}
