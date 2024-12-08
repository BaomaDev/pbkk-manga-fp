package app

import (
	"database/sql"

	"github.com/USER/pbkk-manga-fp/controller"
	"github.com/USER/pbkk-manga-fp/db"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type App struct {
	DB     *sql.DB
	Router *gin.Engine
}

func (a *App) CreateConnection() {
	a.DB = db.Connectdb()
}

func (a *App) Routes() {
	r := gin.Default()
	r.Use(cors.Default())
	r.Static("/uploads", "./uploads")

	mangaController := controller.NewMangaController(a.DB)
	r.POST("/manga", mangaController.InsertManga)
	r.GET("/manga", mangaController.GetAllManga)
	r.GET("/manga/:id", mangaController.GetOneManga)
	r.PUT("/manga/:id", mangaController.UpdateManga)
	r.DELETE("/manga/:id", mangaController.DeleteManga)

	chapterController := controller.NewChapterController(a.DB)
	r.POST("/chapter", chapterController.InsertChapter)
	r.GET("/chapter/:id", chapterController.GetChapters)
	r.DELETE("/chapter/:id", chapterController.DeleteChapter)
	a.Router = r
}

func (a *App) Run() {
	a.Router.Run(":8080")
}
