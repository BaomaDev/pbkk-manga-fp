package controller

import (
	"database/sql"
	"net/http"

	"github.com/USER/pbkk-manga-fp/model"
	"github.com/USER/pbkk-manga-fp/repository"
	"github.com/USER/pbkk-manga-fp/utils"
	"github.com/gin-gonic/gin"
)

type ChapterController struct {
	Db *sql.DB
}

func NewChapterController(db *sql.DB) *ChapterController {
	return &ChapterController{Db: db}
}

// GetChapters retrieves chapters for a given manga ID
func (ch *ChapterController) GetChapters(c *gin.Context) {
	DB := ch.Db
	var uri model.MangaUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "msg": err.Error()})
		return
	}

	repository := repository.NewChapterRepository(DB)
	chapters := repository.GetChaptersByMangaID(uri.ID)
	if chapters != nil {
		c.JSON(http.StatusOK, gin.H{"status": "success", "data": chapters, "msg": "Chapters retrieved successfully"})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "success", "data": nil, "msg": "No chapters found"})
	}
}

// InsertChapter adds a new chapter
func (ch *ChapterController) InsertChapter(c *gin.Context) {
	DB := ch.Db
	var post model.PostChapter

	// Bind request data
	if err := c.ShouldBind(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "msg": err.Error()})
		return
	}

	// Handle file upload
	file, err := c.FormFile("pdf")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "msg": "PDF file is required"})
		return
	}

	// Save the file
	destination := "uploads/chapter"
	filePath, err := utils.UploadFile(file, destination)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "failed", "msg": "File upload failed"})
		return
	}
	post.PdfPath = filePath

	// Insert chapter into the database
	repository := repository.NewChapterRepository(DB)
	if repository.InsertChapter(post) {
		c.JSON(http.StatusOK, gin.H{"status": "success", "msg": "Chapter inserted successfully"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "failed", "msg": "Failed to insert chapter. Chapter number might already exist for this manga"})
	}
}

// DeleteManga implements MangaControllerInterface
func (m *ChapterController) DeleteChapter(c *gin.Context) {
	DB := m.Db
	var uri model.ChapterUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(400, gin.H{"status": "failed", "msg": err})
		return
	}
	repository := repository.NewChapterRepository(DB)
	delete := repository.DeleteChapter(uri.MangaID, uri.ChapterID)
	if delete {
		c.JSON(200, gin.H{"status": "success", "msg": "delete manga successfully"})
		return
	} else {
		c.JSON(500, gin.H{"status": "failed", "msg": "delete manga failed"})
		return
	}
}
