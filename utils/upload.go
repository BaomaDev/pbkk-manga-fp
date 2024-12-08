package utils

import (
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
)

func UploadFile(file *multipart.FileHeader, destination string) (string, error) {
	// Ensure the destination directory exists
	err := os.MkdirAll(destination, os.ModePerm)
	if err != nil {
		log.Println("Error creating directory:", err)
		return "", err
	}

	// Generate the file path
	filePath := filepath.Join(destination, file.Filename)

	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		log.Println("Error opening file:", err)
		return "", err
	}
	defer src.Close()

	// Create the destination file
	dst, err := os.Create(filePath)
	if err != nil {
		log.Println("Error creating destination file:", err)
		return "", err
	}
	defer dst.Close()

	// Copy the content from the uploaded file to the destination
	if _, err := dst.ReadFrom(src); err != nil {
		log.Println("Error writing file:", err)
		return "", err
	}

	return filePath, nil
}
