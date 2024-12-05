package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Connectdb() *sql.DB {
	connStr := fmt.Sprintf("%s:%s@tcp(%s)/%s", UNAMEDB, PASSDB, HOSTDB, DBNAME)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
