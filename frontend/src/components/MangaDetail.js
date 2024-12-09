import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChapterService from "../services/chapterService";

const MangaDetail = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]); 
    const [selectedChapter, setSelectedChapter] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaDetails = async () => {
            try {
                // Fetch manga details
                const mangaResponse = await axios.get(`http://localhost:8080/manga/${id}`);
                setManga(mangaResponse.data.data);

                // Fetch chapters for this manga
                const chaptersResponse = await ChapterService.getByMangaId(id);
                setChapters(chaptersResponse.data || []);
            } catch (err) {
                console.error(err);
                setError("Failed to load manga details");
            } finally {
                setLoading(false);
            }
        };

        fetchMangaDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
            {manga && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{manga.title}</h1>
                    <p className="text-gray-700 mb-4">{manga.description}</p>
                    <div className="mb-4">
                        <p><strong>Author:</strong> {manga.author}</p>
                        <p><strong>Genre:</strong> {manga.genre}</p>
                        <p><strong>Volumes:</strong> {manga.volumes}</p>
                        <p><strong>Total Chapters:</strong> {manga.chapters}</p>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mt-6 mb-4">Chapters</h2>
            {chapters && chapters.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Chapter Number</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr
                                key={chapter.id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => setSelectedChapter(chapter)} 
                            >
                                <td className="border border-gray-300 px-4 py-2">Chapter {chapter.chapter_no}</td>
                                <td className="border border-gray-300 px-4 py-2">{chapter.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No chapters available for this manga.</p>
            )}

            {selectedChapter && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Chapter {selectedChapter.chapter_no}</h2>
                    <div className="border border-gray-300 rounded-md shadow-md p-4">
                        <iframe
                            src={`http://localhost:8080/${selectedChapter.pdf_path}`}
                            className="w-full h-96"
                            title={`Chapter ${selectedChapter.chapter_no} PDF Viewer`}
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MangaDetail;
