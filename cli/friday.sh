#!/bin/bash
case "$1" in
 start)
  cd ../backend && go run cmd/server.go &
  cd ../frontend && npm install && npm run dev &
 ;;
 *)
  echo "friday start"
 ;;
esac
