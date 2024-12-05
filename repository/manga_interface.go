package repository

import "github.com/USER/pbkk-manga-fp/model"

type MangaRepositoryInterface interface {
	InsertManga(model.PostManga) bool
	GetAllManga() []model.Manga
	GetOneManga(uint) model.Manga
	UpdateManga(uint, model.PostManga) model.Manga
	DeleteManga(uint) bool
}
