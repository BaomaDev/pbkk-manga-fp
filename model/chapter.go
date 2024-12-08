package model

type Chapter struct {
	Id        uint   `json:"id"`
	MangaId   uint   `json:"manga_id"`
	ChapterNo uint   `json:"chapter_no"`
	Title     string `json:"title"`
	PdfPath   string `json:"pdf_path"`
}

type PostChapter struct {
	MangaId   int    `form:"manga_id" json:"manga_id" binding:"required"`
	ChapterNo int    `form:"chapter_no" json:"chapter_no" binding:"required"`
	Title     string `form:"title" json:"title" binding:"required"`
	PdfPath   string `json:"pdf_path"`
}

type ChapterUri struct {
    MangaID   uint `uri:"manga_id" binding:"required"`
    ChapterID uint `uri:"chapter_id" binding:"required"`
}