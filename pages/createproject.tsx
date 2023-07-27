import { useState } from "react";
import { Project } from "../grafbase/grafbase.config"; // Import the Project model
import ListBox from "@/components/ListBox";
import 'tailwindcss/tailwind.css';
import {createNewProject} from '../libs/actions';
import Navbar from "@/components/Navbar";



const createproject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteURL: "",
    githubURL: "",
    category: "edeeded",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call createNewProject function instead of Project.create
      const name = "Johnth";
      const email = "mehdipourmahmood@gmail.com";
      await createNewProject(formData,email);
  
      // Clear the form after submission (Note: You might want to do this inside createNewProject function)
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
    <>

    
   
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-gray-700 ">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-bold">Title:</label>
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
        <label htmlFor="description" className="block mb-1 font-bold">Description:</label>
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
        <label htmlFor="image" className="block mb-1 font-bold">Image URL:</label>
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
        <label htmlFor="liveSiteURL" className="block mb-1 font-bold">Live Site URL:</label>
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
        <label htmlFor="githudURL" className="block mb-1 font-bold">GitHub URL:</label>
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
        <ListBox />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Project
      </button>
    </form>
    </>);
};

export default createproject;
