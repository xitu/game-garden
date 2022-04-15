const mysql = require("mysql");
const dbConfig = require("./dbConfig");
const sqlMap = require("./sqlMap");
const log = require("./log");
const { query } = require("express");

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true, // 多语句查询
});
module.exports = {
  //获取排名
  getScoreList(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.getScoreList, (err, result) => {
        if (err) {
          res.json({ code: 0, msg: "获取数据失败" });
          log.writeLog("<getScoreList>" + err, "err");
        } else {
          res.json({ code: 1, data: result });
        }
        connection.release();
      });
    });
  },
  //添加类型
  addScore(req, res, next) {
    let postData = req.body;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.addScore, [postData], (err, result) => {
        if (err) {
          res.json({ code: 0, msg: "添加失败" });
          log.writeLog("<addScore>" + err, "err");
        } else {
          res.json({ code: 1, data: "成功添加" });
        }
        log.writeLog(
          "sql:" +
            sqlMap.addScore +
            ";params:" +
            JSON.stringify(postData) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
};
