"use client"

import { useState, useEffect } from "react"

import QuoteCard from "./QuoteCard"
import { Input } from "./ui/input"

const QuoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((post) => (
        <QuoteCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search state
  const [searchedText, setSearchedText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/quote");
    const data = await response.json();

    setAllPosts(data);
    console.log(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredQuotes = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.source) ||
        regex.test(item.tag) ||
        regex.test(item.quote)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchedText(e.target.value);

    setSearchTimeout(() => {
      const searchResult = filteredQuotes(e.target.value);
      setSearchedResults(searchResult);
    }, 500)
  }

  const handleTagClick = (tagName) => {

    console.log("tagname", tagName);
    setSearchedText(tagName);

    const searchResult = filteredQuotes(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="w-full flex flex-col items-center"> 
      <form>
        <Input 
          type="text"
          placeholder="Search for a quote"
          value={searchedText}
          onChange={handleSearchChange}
          required
          className="outline-none backdrop-blur-sm w-[350px] md:w-[500px] rounded-full text-black px-6"
        />
      </form>

      {searchedText ? (
        <QuoteCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <QuoteCardList 
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed