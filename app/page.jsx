import Image from "next/image"

import Feed from "@components/Feed"

import Background from '@public/BG2.jpg'

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-extrabold text-2xl md:text-5xl text-center max-w-[750px] text-white">
        Discover & Share Inpirational, Motivational, dan Wise Quotes
      </h1>
      <p className="text-center my-12 max-w-[400px] md:max-w-[800px] text-white">
        QuotesHQ is a dedicated platform designed for individuals to discover and share inspirational, motivational, and wise quotes sourced directly from books.
      </p>

      <Feed />
    </div>
  )
}

export default Home