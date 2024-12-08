package repository

import (
	"database/sql"
	"log"

	"github.com/USER/pbkk-manga-fp/model"
)

type ChapterRepository struct {
	Db *sql.DB
}

func NewChapterRepository(db *sql.DB) *ChapterRepository {
	return &ChapterRepository{Db: db}
}

// GetChaptersByMangaID retrieves chapters for a specific manga ID
func (r *ChapterRepository) GetChaptersByMangaID(mangaID uint) []model.Chapter {
	query, err := r.Db.Query("SELECT * FROM chapter WHERE manga_id = ?", mangaID)
	if err != nil {
		log.Println(err)
		return nil
	}
	defer query.Close()

	var chapters []model.Chapter
	for query.Next() {
		var chapter model.Chapter
		err := query.Scan(&chapter.Id, &chapter.MangaId, &chapter.ChapterNo, &chapter.Title, &chapter.PdfPath)
		if err != nil {
			log.Println(err)
			continue
		}
		chapters = append(chapters, chapter)
	}
	return chapters
}

// CheckDuplicateChapter checks if a chapter exists with the given manga_id and chapter_no
func (r *ChapterRepository) CheckDuplicateChapter(mangaID uint, chapterNo uint) bool {
	var exists bool
	err := r.Db.QueryRow("SELECT EXISTS(SELECT 1 FROM chapter WHERE manga_id = ? AND chapter_no = ?)", mangaID, chapterNo).Scan(&exists)
	if err != nil {
		log.Println(err)
		return false
	}
	return exists
}

// InsertChapter inserts a new chapter and updates the manga's total chapters
func (r *ChapterRepository) InsertChapter(post model.PostChapter) bool {
	// Check for duplicate chapter
	if r.CheckDuplicateChapter(uint(post.MangaId), uint(post.ChapterNo)) {
		log.Println("Duplicate chapter number for this manga ID")
		return false
	}

	// Insert the chapter
	stmt, err := r.Db.Prepare("INSERT INTO chapter (manga_id, chapter_no, title, pdf_path) VALUES (?, ?, ?, ?)")
	if err != nil {
		log.Println(err)
		return false
	}
	defer stmt.Close()

	_, err = stmt.Exec(post.MangaId, post.ChapterNo, post.Title, post.PdfPath)
	if err != nil {
		log.Println(err)
		return false
	}

	// Update total chapters in the manga table
	_, err = r.Db.Exec("UPDATE manga SET chapters = chapters + 1 WHERE id = ?", post.MangaId)
	if err != nil {
		log.Println("Failed to update total chapters:", err)
		return false
	}

	return true
}

// DeleteChapter implements MangaRepositoryInterface
func (m *ChapterRepository) DeleteChapter(mangaID uint, chapterID uint) bool {
	// Prepare the DELETE query to remove the chapter
	_, err := m.Db.Exec("DELETE FROM chapter WHERE manga_id = ? AND chapter_id = ?", mangaID, chapterID)
	if err != nil {
		log.Println("Error deleting chapter:", err)
		return false
	}
	return true
}