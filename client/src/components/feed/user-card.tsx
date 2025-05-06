// import { Badge } from "@/components/ui/badge";
// import UserRequestItem from "@/components/UserRequestItem";
// import UserSuggestionsItem from "@/components/UserSuggestionItem";

import useAuthStore from "@/store/AuthStore";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRequestItem from "./user-request-item";
import UserSuggestionItem from "./user-suggestion-item";

export function UserCard() {
  const { token } = useAuthStore();
  const { userRequests, suggestions, getUserRequests, getUserSuggestions } =
    useUserStore();
  useEffect(() => {
    getUserRequests(token);
    getUserSuggestions(token);
  }, [token, getUserRequests, getUserSuggestions]);
  return (
    <Card className="rounded-none shadow-none">
      <CardHeader>
        <CardTitle>Follow Requests</CardTitle>
        {userRequests?.length < 1 && (
          <CardDescription>
            When people ask to follow you, you'll see their requests here.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        {userRequests.map((userReq) => (
          <UserRequestItem request={userReq} />
        ))}
      </CardContent>
      <CardHeader>
        <CardTitle>Suggested</CardTitle>
        {suggestions?.length < 1 && (
          <CardDescription>Find ausome connections.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        {suggestions.map((userReq) => (
          <UserSuggestionItem person={userReq} />
        ))}
      </CardContent>
    </Card>
  );
}
