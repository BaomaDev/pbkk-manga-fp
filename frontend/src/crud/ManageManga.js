import React, { useState, useEffect } from "react";
import MangaService from "../services/mangaService";  // Import MangaService

const ManageManga = () => {
    const [mangas, setMangas] = useState([]);
    const [editingManga, setEditingManga] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        volumes: 0,
        chapters: 0,
        author: "",
        description: "",
    });

    useEffect(() => {
        fetchMangas();
    }, []);

    // Fetch all mangas using MangaService
    const fetchMangas = async () => {
        try {
            const data = await MangaService.getAll();  // Use service to get all mangas
            setMangas(data);
        } catch (error) {
            console.error("Error fetching mangas:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Convert volumes and chapters to integers
        if (name === "volumes" || name === "chapters") {
            setFormData({ ...formData, [name]: parseInt(value, 10) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingManga) {
                // Update manga using MangaService
                await MangaService.update(editingManga.id, formData);
                alert("Manga updated successfully!");
            } else {
                // Create new manga using MangaService
                console.log('Sending data:', formData);
                await MangaService.create(formData);
                alert("Manga created successfully!");
            }
            setFormData({
                title: "",
                genre: "",
                volumes: 0,
                chapters: 0,
                author: "",
                description: "",
            });
            setEditingManga(null);
            fetchMangas();  // Refresh the manga list
        } catch (error) {
            console.log('Sending data:', formData);
            console.error("Error saving manga:", error);
            alert("Failed to save manga. Please try again.");
        }
    };

    const handleEdit = (manga) => {
        setEditingManga(manga);
        setFormData(manga);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this manga?")) {
            try {
                await MangaService.delete(id);  // Use service to delete manga
                alert("Manga deleted successfully!");
                fetchMangas();  // Refresh the manga list
            } catch (error) {
                console.error("Error deleting manga:", error);
                alert("Failed to delete manga. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Manga</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {editingManga ? "Edit Manga" : "Add Manga"}
                </h3>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Volumes</label>
                        <input
                            type="number"
                            name="volumes"
                            value={formData.volumes}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Chapters</label>
                        <input
                            type="number"
                            name="chapters"
                            value={formData.chapters}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md p-2"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {editingManga ? "Update Manga" : "Add Manga"}
                </button>
            </form>
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Manga List</h3>
                <table className="w-full table-auto bg-white shadow-md rounded-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Genre</th>
                            <th className="p-3 text-left">Author</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mangas.map((manga) => (
                            <tr key={manga.id} className="border-b">
                                <td className="p-3">{manga.title}</td>
                                <td className="p-3">{manga.genre}</td>
                                <td className="p-3">{manga.author}</td>
                                <td className="p-3 text-center flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleEdit(manga)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(manga.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageManga;
