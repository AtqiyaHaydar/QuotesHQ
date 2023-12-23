"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

import {
  Card,
  CardContent,
} from "@components/ui/card"

const QuoteCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  
  const handleProfileClick = () => {
    if (post.creator._id == session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }
  
  const handleCopy = () => {
    setCopied(post.quote)
    navigator.clipboard.writeText(post.quote);
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Card className="pt-4 w-[350px] h-auto bg-transparent backdrop-blur-sm">
      <CardContent 
        className="flex gap-x-4 items-center jus"
        onClick={handleProfileClick}
      >
        <Image 
          src={post.creator.image}
          alt='user_image'
          width={40}
          height={40}
          className="rounded-full object-contain cursor-pointer"
        />
        <div>
          <h3 className="text-slate-800">{post.creator.username}</h3>
          <p className="text-slate-200">{post.creator.email}</p>
        </div>
      </CardContent>
      <CardContent className="flex flex-col justify-between">
        <p className="text-slate-800">
          {post.quote}
        </p>
        <p className="mt-4 text-slate-800">- {post.source}</p>
        <p 
          className="mt-4 text-blue-700 cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >#{post.tag}</p>
      </CardContent>

      {session?.user.id == post.creator._id && pathName === "/profile" && (
        <CardContent className="flex items-center gap-x-4">
          <p
            className="cursor-pointer text-sm hover:font-medium transition-all"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="cursor-pointer text-sm hover:text-red-500 hover:font-medium transition-all"
            onClick={handleDelete}
          >
            Delete
          </p>
        </CardContent>
      )}
    </Card>
  )
}

export default QuoteCard