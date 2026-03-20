package websocket

import (
"github.com/gin-gonic/gin"
"github.com/gorilla/websocket"
"time"
)

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

func RegisterWS(r *gin.Engine) {
r.GET("/ws", func(c *gin.Context) {
conn, _ := upgrader.Upgrade(c.Writer, c.Request, nil)
for {
_, msg, _ := conn.ReadMessage()
res := "AI: " + string(msg)
for _, ch := range res {
conn.WriteMessage(websocket.TextMessage, []byte(string(ch)))
time.Sleep(5 * time.Millisecond)
}
}
})
}
