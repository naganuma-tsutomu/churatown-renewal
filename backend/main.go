package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/minio/minio-go/v7"
)

var (
	db          *sql.DB
	minioClient *minio.Client
	bucketName  string
	publicURL   string
	jwtSecret   []byte
)

func main() {
	// シークレットキーの取得
	jwtSecret = []byte(getEnv("JWT_SECRET", "default-secure-key-change-this"))

	initDB()
	initMinio()
	defer db.Close()

	r := gin.Default()

	// ミドルウェア
	r.Use(corsMiddleware())

	// APIルート
	api := r.Group("/api")
	{
		// 店舗
		api.GET("/shops", getShops)
		api.GET("/shops/:id", getShopByID)
		api.POST("/shops", authMiddleware(), createShop)

		// ニュース
		api.GET("/news", getNews)
		api.POST("/news", authMiddleware(), createNews) // ニュース投稿も認証必須に変更（推奨）

		// アップロード
		api.POST("/upload", authMiddleware(), uploadImage)

		// 認証
		auth := api.Group("/auth")
		{
			auth.POST("/register", register)
			auth.POST("/login", login)
			auth.GET("/me", authMiddleware(), getMe)
		}
	}

	port := getEnv("PORT", "8080")
	fmt.Printf("Server starting on port %s...\n", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
