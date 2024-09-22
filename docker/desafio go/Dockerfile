FROM golang:1.18-alpine AS builder
 
WORKDIR /app
 
COPY main.go .
 
ENV GO111MODULE=off
 
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags "-w -s" -o hello_world .
 
FROM scratch
 
COPY --from=builder /app/hello_world .
 
CMD [ "./hello_world" ]