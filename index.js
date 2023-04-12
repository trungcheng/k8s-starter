const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Kube starter locally\n");
});

server.listen(3002, () => {
    console.log("Server listen on port 3002");
});