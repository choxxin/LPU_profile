import React, { useState } from "react";
import useCreatePost from "../hooks/usepost";
import useUserStore from "@/store/useUserStore";
export default function CreatePostForm() {
  const { id } = useUserStore();
  const [formData, setFormData] = useState({
    userId: id,
    prompt: "",
    tag: "",
  });

  const { createPost, loading, error, success } = useCreatePost();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        placeholder="Enter your prompt"
        required
      />
      <input
        type="text"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        placeholder="Enter tags"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
      {error && <p>Error: {error}</p>}
      {success && <p>Post created successfully!</p>}
    </form>
  );
}
