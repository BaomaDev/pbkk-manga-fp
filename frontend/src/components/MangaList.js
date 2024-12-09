import React, { useState, useEffect } from "react";
import { fetchMangas } from "../services/api";
import MangaCard from "./MangaCard";

const MangaList = () => {
    const [mangas, setMangas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMangas = async () => {
            try {
                const data = await fetchMangas();
                setMangas(data);
            } catch (error) {
                setError("Failed to load mangas");
            } finally {
                setLoading(false);
            }
        };
        getMangas();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap justify-center">
            {mangas.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
            ))}
        </div>
    );
};

export default MangaList;
