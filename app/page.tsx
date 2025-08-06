"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState<{
    id: string;
    title: string;
    body: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    // Fetch data from this api

    // try {
    //   setIsLoading(true);
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/posts"
    //   );
    //   console.log(response);
    //   const json = await response.json();
    //   if (response.ok) {
    //     setPosts(json);
    //     setError(null);
    //   } else {
    //     setError("Something went wrong");
    //   }
    // } catch (e) {
    //   setError("Something went wrong");
    // } finally {
    //   setIsLoading(false);
    // }

    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if(!res.ok) {
                    setError("Error in fetching")
                }else{
                    setError(null);
                }
                return res.json()})
            .then(data => setPosts(data))
            .catch(err => console.error('Error fetching quote:', err))   
            .finally(() => setIsLoading(false)) 

    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const json = await response.json();
    // setPosts(json);

    // When you have a response
    // fetch("https://jsonplaceholder.typicode.com/posts");
    // .then((response) => {
    //   console.log("Converting to JSON");
    //   // Convert it to JSON
    //   return response.json();
    // })
    // // WHen you're done converting
    // .then((json) => {
    //   // Set the json to the state
    //   setPosts(json);
    // });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="text-4xl font-bold">Week 11: API fetching</div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {posts && (
        <>
          <div className="text-2xl">Social media posts</div>
          {posts.map((post) => (
            <div className="border p-2 my-2" key={post.id}>
              <div>Title: {post.title}</div>
              <div>Body: {post.body}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
