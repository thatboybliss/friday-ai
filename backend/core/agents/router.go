package agents
func Route(input string) string {
if len(input) < 40 {
return "fast"
}
return "deep"
}
