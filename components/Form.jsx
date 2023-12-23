"use client"

import Link from "next/link";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { toast } = useToast();

  return (
    <section className="w-full max-w-full flex flex-col justify-start px-8 md:pl-20">
      <h1 className="text-2xl md:text-5xl font-bold text-white">
        {type} Post
      </h1>
      <p className="text-left text-white mt-2">
        {type} and share inspirational, motivational, and wise quotes sourced directly from books.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-4"
      >
        <Label className="text-white text-xl">
          Your Quote
        </Label>
        <Textarea
          value={post.quote}
          onChange={(e) => setPost({ ...post, quote: e.target.value })}
          placeholder="Write your quote here"
          required
          className="flex rounded-lg h-[200px] max-w-[500px] p-4 text-sm text-gray-500 outline-0 bg-transparent backdrop-blur-sm"
        />

        <Label className="mt-4 text-white text-xl">
          Source of Quote
        </Label>
        <Input 
          value={post.source}
          onChange={(e) => setPost({ ...post, source: e.target.value })}
          placeholder="Write the source of your quote here"
          required
          className="flex rounded-lg h-[50px] max-w-[500px] p-4 text-sm text-gray-500 outline-o bg-transparent backdrop-blur-sm"
        />

        <Label className="mt-4 text-white text-xl">
          Field of Quote
        </Label>
        <Input 
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value})}
          placeholder="Write the field of your quote here"
          required
          className="flex rounded-lg h-[50px] max-w-[500px] p-4 text-sm text-gray-500 outline-o  bg-transparent backdrop-blur-sm"
        />

        <div className="mt-4 flex justify-center items-center gap-x-4 md:items-left md:justify-start max-w-[400px]">
          <Link href="/">
            <Button 
              className="rounded-full w-[150px] hover:scale-105 transition-all" 
              variant="destructive">
                Cancel
              </Button>
          </Link>

          <Button
            type='submit'
            disabled={submitting}
            className="rounded-full w-[150px] hover:scale-105 transition-all"
            onClick={() => {
              console.log("Clicked")
              toast({
                title: "Your quote has been submitted!",
              })
            }}
          >
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default Form