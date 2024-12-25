"use client";
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession} from '@/lib/auth-client';
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
import { useRouter } from "next/navigation";

const UserAvatar: FC = () => {
  const router = useRouter()

  const { data, isPending } = useSession();


  if (isPending) {
    return <Loader2 className="animate-spin" />;
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
        }
      }
    })

  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border border-zinc-200/30">
          <AvatarFallback className="font-bold">
            {data?.user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MailIcon />
            {data?.user?.email}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserIcon />
            {data?.user?.name}
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
