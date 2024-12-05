package main

import "github.com/USER/pbkk-manga-fp/app"

func main() {
	var a app.App
	a.CreateConnection()
	a.Routes()
	a.Run()
}
