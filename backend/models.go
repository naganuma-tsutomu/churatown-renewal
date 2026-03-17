package main

type User struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"-"`
	Role         string `json:"role"` // "admin" or "owner"
	CreatedAt    string `json:"created_at"`
}

type Shop struct {
	ID         int    `json:"id"`
	OwnerID    *int   `json:"owner_id"`
	Name       string `json:"name"`
	Address    string `json:"address"`
	Phone      string `json:"phone"`
	Category   string `json:"category"`
	Attributes string `json:"attributes"`
	ImageURL   string `json:"image_url"`
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
