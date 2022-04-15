/*
 * @Author: zheng yong tao
 * @Date: 2022-02-27 16:55:47
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-14 00:05:59
 * @Description:
 */
function addZero(str) {
  str = (str + "").length === 1 ? "0" + str : str;
  return str;
}
function getTime(format = "") {
  const date = new Date();
  const year = addZero(date.getFullYear());
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());
  let res = "";
  switch (format) {
    case "yyyy-mm-dd":
      res = year + "-" + month + "-" + day;
      break;
    default:
      res =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second;
  }
  return res;
}
module.exports = { getTime };
