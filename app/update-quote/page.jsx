"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quoteId = searchParams.get("id")

  const [post, setPost] = useState({
    quote: "",
    source: "",
    tag: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getQuoteDetails = async () => {
      const response = await fetch (`/api/quote/${quoteId}`)
      const data = await response.json()

      setPost({
        quote: data.quote,
        source: data.source,
        tag: data.tag,
      })
    }

    if (quoteId) getQuoteDetails();
  }, [quoteId])

  const updateQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    if (!quoteId) return alert("Missing QuoteID!")

    try {
      const response = await fetch(`/api/quote/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          source: post.quote,
          tag: post.tag,
        })
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      isSubmitting(false)
    }
  }
  
  return (
    <Form 
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={updateQuote}
    />
  )
}

export default page