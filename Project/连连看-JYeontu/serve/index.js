/*
 * @Author: zheng yong tao
 * @Date: 2022-01-16 01:35:17
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-06 10:54:15
 * @Description:
 */
const express = require("express");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");

app.use(require("cors")());
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/", router);

const server = app.listen(3003, (req, res) => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("blog listening at http://%s:%s", host, port);
});
