import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MangaList from "./components/MangaList";
import MangaDetail from "./components/MangaDetail";
import ManageManga from "./crud/ManageManga";

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <header className="p-4 bg-blue-500 text-white text-center">
                    <h1 className="text-xl font-bold">Manga Library</h1>
                </header>
                <main className="p-6">
                    <Routes>
                        <Route path="/" element={<MangaList />} />
                        <Route path="/manga/:id" element={<MangaDetail />} />
                        <Route path="/manage-manga" element={<ManageManga />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
