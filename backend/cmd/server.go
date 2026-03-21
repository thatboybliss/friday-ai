package main

import (
	"log"
	"net/http"

	"friday/websocket"
)

func main() {
	mux := http.NewServeMux()
	websocket.RegisterRoutes(mux)

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Friday AI backend listening on http://localhost:8080")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
