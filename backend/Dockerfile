FROM golang:1.24-alpine

WORKDIR /app

# ファイルをコピー
COPY go.mod main.go ./

# 依存関係の解決とビルド
RUN go mod edit -require github.com/minio/minio-go/v7@v7.0.80 && \
    go mod edit -require github.com/golang-jwt/jwt/v5@v5.0.0 && \
    go mod edit -require golang.org/x/crypto@v0.14.0 && \
    go mod tidy && \
    go build -o main .

EXPOSE 8080

CMD ["./main"]
