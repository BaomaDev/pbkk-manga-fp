package model

type Manga struct {
	Id          uint   `json:"id"`
	Title       string `json:"title"`
	Genre       string `json:"genre"`
	Volumes     uint8  `json:"volumes"`
	Chapters    uint16 `json:"chapters"`
	Author      string `json:"author"`
	Description string `json:"description"`
}

type PostManga struct {
	Title       string `json:"title"`
	Genre       string `json:"genre"`
	Volumes     uint8  `json:"volumes"`
	Chapters    uint16 `json:"chapters"`
	Author      string `json:"author"`
	Description string `json:"description"`
}

type MangaUri struct {
	ID uint `uri:"id" binding:"required,number"`
}
