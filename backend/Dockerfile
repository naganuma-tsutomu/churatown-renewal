FROM golang:1.25-alpine

WORKDIR /app

COPY main.go ./

RUN go mod init backend && \
    go get github.com/gin-contrib/cors@v1.5.0 \
           github.com/gin-gonic/gin@v1.9.1 \
           github.com/lib/pq@v1.10.9 \
           github.com/minio/minio-go/v7 && \
    go mod tidy

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
