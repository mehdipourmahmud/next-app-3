"use client"
import { useState } from "react";
import ListBox from "@/components/ListBox";
import "tailwindcss/tailwind.css";
import { createNewProject, fetchToken } from "../libs/actions";
import { useRouter } from "next/navigation";

const CreateNewProject = ({session}) => {
const [category, setsetCategory] = useState('')
console.log(category,'cat')
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteURL: "",
    githubURL: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await fetchToken();
    router.push("/");
  console.log(session?.user?.id,'idd')
    try {
      const form ={...formData,category}
  await createNewProject(form, session?.user?.id, token); // Pass the userId directly
      setFormData({
        title: "",
        description: "",
        image: "",
        liveSiteURL: "",
        githubURL: "",
        category: "",
      });
  
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };
  
  return (
    <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-lg mx-auto"
          >
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-bold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-bold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1 font-bold">
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="liveSiteURL" className="block mb-1 font-bold">
              Live Site URL:
            </label>
            <input
              type="text"
              id="liveSiteURL"
              name="liveSiteURL"
              value={formData.liveSiteURL}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>


    
          <div className="mb-4">
            <label htmlFor="githudURL" className="block mb-1 font-bold">
              GitHub URL:
            </label>
            <input
              type="text"
              id="githubURL"
              name="githubURL"
              value={formData.githubURL}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <ListBox setsetCategory={setsetCategory}/>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Project
          </button>
        </form>
    </div>
  );
};

export default CreateNewProject;
