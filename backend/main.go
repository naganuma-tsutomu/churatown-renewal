package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var (
	db          *sql.DB
	minioClient *minio.Client
	bucketName  string
	publicURL   string
)

type Shop struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Address    string `json:"address"`
	Phone      string `json:"phone"`
	Category   string `json:"category"`
	Attributes string `json:"attributes"`
	CreatedAt  string `json:"created_at"`
}

type ShopNews struct {
	ID          int     `json:"id"`
	ShopID      int     `json:"shop_id"`
	Title       string  `json:"title"`
	Content     string  `json:"content"` // HTML Content
	ImageURL    *string `json:"image_url"`
	PublishedAt string  `json:"published_at"`
}

func initDB() {
	time.Sleep(5 * time.Second)
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %v", err)
	}
	fmt.Println("Successfully connected to database!")
}

func initMinio() {
	endpoint := os.Getenv("MINIO_ENDPOINT")
	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	useSSL := os.Getenv("MINIO_USE_SSL") == "true"
	bucketName = os.Getenv("MINIO_BUCKET")
	publicURL = os.Getenv("PUBLIC_MINIO_URL")

	var err error
	minioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalf("Error initializing MinIO: %v", err)
	}

	// Check if bucket exists
	ctx := context.Background()
	exists, err := minioClient.BucketExists(ctx, bucketName)
	if err != nil {
		log.Printf("Error checking bucket: %v", err)
	}
	if !exists {
		log.Printf("Bucket %s does not exist yet. MC init should handle it.", bucketName)
	}
	fmt.Println("MinIO initialized successfully!")
}

func main() {
	initDB()
	initMinio()
	defer db.Close()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/api/shops", getShops)
	r.GET("/api/shops/:id", getShopByID)
	r.GET("/api/news", getNews)
	r.POST("/api/news", createNews)
	r.POST("/api/upload", uploadImage)

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}

func getShops(c *gin.Context) {
	category := c.Query("category")
	attrKey := c.Query("attr_key")
	attrVal := c.Query("attr_val")

	query := "SELECT id, name, address, phone, category, attributes, created_at FROM shops WHERE 1=1"
	var args []interface{}
	argId := 1

	if category != "" {
		query += fmt.Sprintf(" AND category = $%d", argId)
		args = append(args, category)
		argId++
	}

	if attrKey != "" && attrVal != "" {
		query += fmt.Sprintf(" AND attributes->>$%d = $%d", argId, argId+1)
		args = append(args, attrKey, attrVal)
		argId += 2
	}

	rows, err := db.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var shops []Shop
	for rows.Next() {
		var s Shop
		var attrBytes []byte
		var createdAt time.Time
		if err := rows.Scan(&s.ID, &s.Name, &s.Address, &s.Phone, &s.Category, &attrBytes, &createdAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		s.Attributes = string(attrBytes)
		s.CreatedAt = createdAt.Format(time.RFC3339)
		shops = append(shops, s)
	}
	c.JSON(http.StatusOK, shops)
}

func getShopByID(c *gin.Context) {
	id := c.Param("id")
	var s Shop
	var attrBytes []byte
	var createdAt time.Time
	err := db.QueryRow("SELECT id, name, address, phone, category, attributes, created_at FROM shops WHERE id = $1", id).
		Scan(&s.ID, &s.Name, &s.Address, &s.Phone, &s.Category, &attrBytes, &createdAt)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shop not found"})
		return
	}
	s.Attributes = string(attrBytes)
	s.CreatedAt = createdAt.Format(time.RFC3339)
	c.JSON(http.StatusOK, s)
}

func getNews(c *gin.Context) {
	shopID := c.Query("shop_id")
	query := "SELECT id, shop_id, title, content, image_url, published_at FROM shop_news ORDER BY published_at DESC"
	var args []interface{}

	if shopID != "" {
		query = "SELECT id, shop_id, title, content, image_url, published_at FROM shop_news WHERE shop_id = $1 ORDER BY published_at DESC"
		args = append(args, shopID)
	}

	rows, err := db.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var newsList []ShopNews
	for rows.Next() {
		var n ShopNews
		var publishedAt time.Time
		if err := rows.Scan(&n.ID, &n.ShopID, &n.Title, &n.Content, &n.ImageURL, &publishedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		n.PublishedAt = publishedAt.Format(time.RFC3339)
		newsList = append(newsList, n)
	}
	c.JSON(http.StatusOK, newsList)
}

func createNews(c *gin.Context) {
	var input struct {
		ShopID   int     `json:"shop_id" binding:"required"`
		Title    string  `json:"title" binding:"required"`
		Content  string  `json:"content" binding:"required"`
		ImageURL *string `json:"image_url"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newID int
	err := db.QueryRow("INSERT INTO shop_news (shop_id, title, content, image_url) VALUES ($1, $2, $3, $4) RETURNING id",
		input.ShopID, input.Title, input.Content, input.ImageURL).Scan(&newID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": newID, "message": "News created successfully"})
}

func uploadImage(c *gin.Context) {
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}
	defer file.Close()

	fileName := fmt.Sprintf("%d_%s", time.Now().Unix(), header.Filename)
	ctx := context.Background()

	_, err = minioClient.PutObject(ctx, bucketName, fileName, file, header.Size, minio.PutObjectOptions{
		ContentType: header.Header.Get("Content-Type"),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fileURL := fmt.Sprintf("%s/%s", publicURL, fileName)
	c.JSON(http.StatusOK, gin.H{"url": fileURL})
}
