import React from "react";
import { Link } from "react-router-dom";

const MangaCard = ({ manga }) => {
    return (
        <Link
            to={`/manga/${manga.id}`}
            className="bg-white shadow-md rounded-md p-4 m-2 max-w-sm transform hover:scale-105 transition-transform"
        >
            <h2 className="text-lg font-bold text-gray-800">{manga.title}</h2>
            <p className="text-sm text-gray-600">{manga.description}</p>
            <div className="mt-2">
                <p className="text-sm">
                    <strong>Author:</strong> {manga.author || "Unknown"}
                </p>
                <p className="text-sm">
                    <strong>Genre:</strong> {manga.genre}
                </p>
                <p className="text-sm">
                    <strong>Volumes:</strong> {manga.volumes}
                </p>
                <p className="text-sm">
                    <strong>Chapters:</strong> {manga.chapters}
                </p>
            </div>
        </Link>
    );
};

export default MangaCard;
