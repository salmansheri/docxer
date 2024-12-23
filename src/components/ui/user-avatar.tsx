"use client";
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser, useSignOut } from "@/hooks/auth/useAuth";
import { Loader2, LogOutIcon, MailIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserAvatar: FC = () => {
  const { data, isPending } = useCurrentUser();
  const { mutate: signOut, isPending: isSignOutPending } = useSignOut();

  if (isPending || isSignOutPending) {
    return <Loader2 className="animate-spin" />;
  }

  const handleSignOut = () => {
    signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border border-zinc-200/30">
          <AvatarFallback className="font-bold">
            {data?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MailIcon />
            {data?.email}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserIcon />
            {data?.name}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
