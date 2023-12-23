"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreateQuote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: "",
    source: "",
    tag: "",    
  })

  const createQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote/new", {
        method: "POST",
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user.id,
          source: post.source,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/")
      }
    } catch {
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={createQuote}
      />
    </div>
  )
}

export default CreateQuote