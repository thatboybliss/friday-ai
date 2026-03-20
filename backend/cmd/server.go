package main

import (
"github.com/gin-gonic/gin"
"friday/websocket"
)

func main() {
r := gin.Default()
websocket.RegisterWS(r)
r.Run(":8080")
}
