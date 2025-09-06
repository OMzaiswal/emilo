import React, { useEffect, useState } from "react";
import { api } from "../api/axios";

interface Author {
  _id: string;
  fullName: string;
  username: string;
  profilePicture?: string;
}

interface Comment {
  _id: string;
  content: string;
}

interface Post {
  _id: string;
  content: string;
  images?: string[];
  author: Author;
  comments: Comment[];
  createdAt: string;
}

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/feed");
        setPosts(response.data.posts);
      } catch (err: any) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading feed...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img
                  src={post.author.profilePicture || "/default-avatar.png"}
                  alt={post.author.fullName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{post.author.fullName}</p>
                  <p className="text-sm text-gray-500">@{post.author.username}</p>
                </div>
              </div>
              <p className="mb-2">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {post.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="post"
                      className="rounded-md w-full h-auto"
                    />
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {post.comments.length} comments
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
