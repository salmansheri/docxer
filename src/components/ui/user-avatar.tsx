"use client";
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
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
import { motion } from "motion/react";

const UserAvatar: FC = () => {
  const router = useRouter();

  const { data, isPending } = useSession();

  if (isPending) {
    return <Loader2 className="animate-spin" />;
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
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
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
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
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
