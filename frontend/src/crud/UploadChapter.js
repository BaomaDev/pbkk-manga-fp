import React, { useState, useEffect } from "react";
import ChapterService from "../services/chapterService";

const ManageChapter = () => {
    const [formData, setFormData] = useState({
        mangaId: "",
        chapterNo: 0,
        title: "",
        pdfFile: null,
    });
    const [chapters, setChapters] = useState([]); // To store fetched chapters
    const [deleteMangaId, setDeleteMangaId] = useState(""); // Manga ID for deletion
    const [deleteChapterNo, setDeleteChapterNo] = useState(""); // Chapter number for deletion

    // Fetch chapters by manga ID
    const fetchChapters = async (mangaId) => {
        try {
            const response = await ChapterService.getByMangaId(mangaId);
            console.log("API Response for chapters:", response.data); // Debugging log
            setChapters(response.data || []); // Fallback to an empty array if the response is null
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    useEffect(() => {
        if (formData.mangaId) {
            fetchChapters(formData.mangaId); // Fetch chapters whenever mangaId changes
        }
    }, [formData.mangaId]);

    useEffect(() => {
        if (deleteMangaId) {
            fetchChapters(deleteMangaId); // Fetch chapters whenever deleteMangaId changes
        }
    }, [deleteMangaId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, pdfFile: e.target.files[0] });
    };

    const handleSubmitChapter = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("manga_id", formData.mangaId);
            formDataToSend.append("chapter_no", formData.chapterNo);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("pdf", formData.pdfFile);

            await ChapterService.create(formDataToSend);
            alert("Chapter uploaded successfully!");
            setFormData({ mangaId: "", chapterNo: 0, title: "", pdfFile: null });
            fetchChapters(formData.mangaId); // Fetch updated chapters after upload
        } catch (error) {
            console.error("Error uploading chapter:", error);
            alert("Failed to upload chapter. Please try again.");
        }
    };

    const handleDeleteChapter = async () => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            if (!deleteMangaId || !deleteChapterNo) {
                alert("Manga ID and Chapter Number are required to delete a chapter.");
                return;
            }

            try {
                console.log("Deleting chapter with Manga ID:", deleteMangaId, "Chapter No:", deleteChapterNo); // Debugging log
                await ChapterService.delete(deleteMangaId, deleteChapterNo);
                alert("Chapter deleted successfully!");
                fetchChapters(deleteMangaId); // Refresh chapters after deletion
                setDeleteMangaId("");
                setDeleteChapterNo("");
            } catch (error) {
                console.error("Error deleting chapter:", error);
                alert("Failed to delete chapter. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Chapters</h2>

            {/* Section 1: Upload Chapter */}
            <div className="bg-white shadow-md rounded-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Chapter</h3>
                <form onSubmit={handleSubmitChapter}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Manga ID</label>
                        <input
                            type="number"
                            name="mangaId"
                            value={formData.mangaId}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Chapter Number</label>
                        <input
                            type="number"
                            name="chapterNo"
                            value={formData.chapterNo}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Chapter Title</label>
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
                        <label className="block text-gray-700 font-bold mb-1">Upload PDF</label>
                        <input
                            type="file"
                            name="pdfFile"
                            onChange={handleFileChange}
                            className="w-full border-gray-300 rounded-md p-2"
                            accept="application/pdf"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Upload Chapter
                    </button>
                </form>
            </div>

            {/* Section 2: Delete Chapter */}
            <div className="bg-white shadow-md rounded-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Chapter</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Manga ID</label>
                    <input
                        type="number"
                        name="deleteMangaId"
                        value={deleteMangaId}
                        onChange={(e) => setDeleteMangaId(e.target.value)}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-1">Chapter Number</label>
                    <select
                        name="deleteChapterNo"
                        value={deleteChapterNo}
                        onChange={(e) => setDeleteChapterNo(e.target.value)}
                        className="w-full border-gray-300 rounded-md p-2"
                        required
                    >
                        <option value="">Select a chapter</option>
                        {chapters.map((chapter) => (
                            <option
                                key={chapter.id} // Ensure this is unique
                                value={chapter.id} // Use chapterNo as the value
                            >
                                {chapter.chapter_no} - {chapter.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleDeleteChapter}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Delete Chapter
                </button>
            </div>
        </div>
    );
};

export default ManageChapter;
