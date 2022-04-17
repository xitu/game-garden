/*
 * @Author: zheng yong tao
 * @Date: 2022-02-27 16:54:58
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-02-27 21:11:41
 * @Description:日志模块
 */
const fs = require("fs");
const path = require("path");
const util = require("./util");

const logConfig = {
  maxFileNum: 10, //最多保存文件数,一般情况下一天一个文件
  maxFileSize: 4, //M
  dirPath: "", //基本路径
};
/**
 * 写入日志
 * @param {String} type // 日志类型 err 错误日志 sql sql日志
 * @param {String} content //写入文本信息
 */
async function writeLog(content, type = "err") {
  let dirPath = logConfig.dirPath;
  const typePath = `${dirPath}log/${type}`;
  // 创建不存在的文件夹
  await dirExists(typePath);
  let filePath = getFileName(typePath, true);
  // 获取到文件files
  fs.readFile(filePath, (err, data) => {
    if (err) {
    }
    let flag = fileSizeLimit(filePath);
    if (flag) {
      filePath = getFileName(typePath, false);
      data = "";
    }
    // 写入文件
    fs.writeFile(
      filePath,
      `${data || ""}\n${content} ${util.getTime()}`,
      async (err) => {
        if (err) {
          console.log(err);
        }
        // console.log("The file was saved!");
        await fileNumLimit(typePath);
      }
    );
  });
}
/**
 * 创建不存在的文件夹
 * @param {String} dir // 文件夹路径
 * @param {String} path //当前路径
 */
function dirExists(dir, path = "") {
  if (fs.existsSync(dir)) {
    // console.log(dir + "已存在");
    return;
  }
  //不能一次性创建多级目录，需要一级一级进行创建
  dir = dir.split("/"); //提取出每一级的目录名
  //逐级创建
  while (dir.length > 0) {
    path += dir.shift();
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      console.log("创建文件夹：", path);
    } else {
      // console.log(path + "已存在");
    }
    path += "/";
  }
}
/**
 *
 * @param {String} dirPath 文件夹路径
 * @param {String} flag true：新文件，false：旧文件
 * @returns
 */
function getFileName(dirPath, flag = false) {
  const date = util.getTime("yyyy-mm-dd");
  const list = fs.readdirSync(dirPath);
  let num = 0;
  list.map((item) => {
    if (item.startsWith(date)) {
      num = Math.max(num, parseInt(item.split(".")[0].split("-")[3] || 0) + 1);
    }
  });
  if (flag) num--;
  if (num < 1) {
    return dirPath + "/" + date + ".log";
  }
  return dirPath + "/" + date + "-" + num + ".log";
}
/**
 * 文件数目限制，超过最大数目则删除日期较早的文件
 * @param {*} dirPath 目录路径
 */
function fileNumLimit(dirPath) {
  let list = fs.readdirSync(dirPath);
  list = list.sort((a, b) => {
    a = a.split("-");
    b = b.split("-");
    if (a.length > b.length) return 1;
    for (let i = 0; i < b.length; i++) {
      if (parseInt(a[i]) > parseInt(b[i] || 0)) return 1;
    }
    return -1;
  });
  while (list.length > logConfig.maxFileNum) {
    let path = dirPath + "/" + list.shift();
    fs.unlinkSync(path);
  }
}
/**
 * 单文件大小限制，超过最大值新建文件
 * @param {*} filePath 目录路径
 */
function fileSizeLimit(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  const fileStat = fs.statSync(filePath);
  const isFile = fileStat.isFile();
  if (isFile) {
    let size = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    return parseFloat(size) > logConfig.maxFileSize;
  }
}

module.exports = { writeLog };
// writeLog("error", "err");
