const exec = require("child_process").exec,
  app = require("express")(),
  server = require("http").createServer(app),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  port = 3300;
app
  .use(cors())
  .use(require("express").json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get("/", (req, res) => res.status(200).send("use /access for feature ping"))
  .post("/access", (req, res) => {
    let { access_code } = req.body,
      { method, ip } = req.query;
    try {
      if (method.length === 1 && method == "ping") {
        access_code = parseInt(access_code, 10);
        if (access_code == "1") {
          console.log("allow");
          console.log(ip);
          if (
            ip.includes(";;") ||
            ip.includes("&&") ||
            ip.includes("||") ||
            ip.includes("*") ||
            ip.includes("**")
          ) {
            return res.status(500).send("not allow 👀 👀 👀");
          } else {
            console.log("has allowed");
            console.log(ip);
            exec(`ping -c 3 ${ip}`, function (err, stdout, stderr) {
              console.log(stdout);
            });
          }
        } else {
          return res.status(500).send("not allow 👀 👀 👀");
        }
      } else {
        return res.status(500).send("not allow 👀 👀 👀");
      }
    } catch (error) {
      return res.status(500).send("failed return");
    }
  });
server.listen(port, () => console.log(`this server running on port ${port}`));
  