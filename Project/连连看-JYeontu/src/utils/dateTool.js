/**
 * 判断润年
 * @param {string} year 年份
 * @return {Boolean}
 */

export const isLeap = function(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
};
/**
 * 获取星期
 * @param {string} date 日期
 * @return {string} 星期
 */
export const getWeek = function(date) {
  let Stamp = new Date(date);
  // return weeks[Stamp.getDay()];
  let weeks = ["日", "一", "二", "三", "四", "五", "六"];
  return weeks[Stamp.getDay()];
};
/**
 * 获取月份天数
 * @param {string} year  年份
 * @param {string} month 月份
 * @return {number} 月份天数
 */
export const getMonthDays = function(year, month) {
  month = parseInt(month) - 1;
  if (month < 0 || month > 11) return "";
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeap(year)) {
    months[1] = 29;
  }
  return months[month];
};
/**
 * 数字补零
 * @param {string} str
 * @return {string}
 */
export const zero = function(str) {
  str = parseInt(str);
  return str > 9 ? str : "0" + str;
};
/**
 * 获取今天日期
 * @param {string} str  日期格式
 * @return {string} 格式化日期
 */
export const getToday = function(str = "yyyy-mm-dd") {
  const date = new Date();
  const year = date.getFullYear(),
    month = zero(date.getMonth() + 1),
    day = zero(date.getDate()),
    hour = zero(date.getHours()),
    minute = zero(date.getMinutes()),
    second = zero(date.getSeconds());
  let res = "";
  switch (str) {
    case "yyyy-mm-dd":
      res = year + "-" + month + "-" + day;
      break;
    case "mm-dd-yyyy":
      res = month + "-" + day + "-" + year;
      break;
    case "yyyy-mm-dd hh:MM:ss":
      res =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      break;
    case "hh:MM:ss":
      res = hour + ":" + minute + ":" + second;
      break;
    case "yyyy":
      res = year;
      break;
    case "mm":
      res = month;
      break;
    case "dd":
      res = day;
      break;
    case "hh":
      res = hour;
      break;
    case "MM":
      res = minute;
      break;
    case "ss":
      res = second;
      break;
    case "mm-dd":
      res = month + "-" + day;
      break;
    default:
      res = "参数错误";
      break;
  }
  return res;
};
/**
 * 将时间按照所传入的时间格式进行转换
 * @param {string} value  日期
 * @param {string} formatStr  日期格式
 * @return {string} 格式化日期
 */
export const dateFormat = function(value, formatStr = "yyyy-mm-dd") {
  const date = new Date(value);
  const year = date.getFullYear(),
    month = zero(date.getMonth() + 1),
    day = zero(date.getDate()),
    hour = zero(date.getHours()),
    minute = zero(date.getMinutes()),
    second = zero(date.getSeconds());
  let res = "";
  switch (formatStr) {
    case "yyyy-mm-dd":
      res = year + "-" + month + "-" + day;
      break;
    case "mm-dd-yyyy":
      res = month + "-" + day + "-" + year;
      break;
    case "yyyy-mm-dd hh:MM:ss":
      res =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      break;
    case "hh:MM:ss":
      res = hour + ":" + minute + ":" + second;
      break;
    case "yyyy":
      res = year;
      break;
    case "mm":
      res = month;
      break;
    case "dd":
      res = day;
      break;
    case "hh":
      res = hour;
      break;
    case "MM":
      res = minute;
      break;
    case "ss":
      res = second;
      break;
    case "mm-dd":
      res = month + "-" + day;
      break;
    default:
      res = "参数错误";
      break;
  }
  return res;
};
/**
 * 获取上一天日期
 * @param {string} str  当前日期
 * @return {string} 上一天日期
 */
export const getYesterday = function(str) {
  let date = str.split("-");
  let year = parseInt(date[0]),
    month = parseInt(date[1]),
    day = parseInt(date[2]);
  if (month > 12 || month < 1 || day > getMonthDays(year, month))
    return "日期不合法";
  day -= 1;
  if (day > 0) {
    return year + "-" + zero(month) + "-" + zero(day);
  }
  month -= 1;
  if (month > 0) {
    return year + "-" + zero(month) + "-" + getMonthDays(year, month);
  }
  year -= 1;
  return year + "-" + 12 + "-" + getMonthDays(year, 12);
};
/**
 * 获取下一天日期
 * @param {string} str  当前日期
 * @return {string} 下一天日期
 */
export const getTomorrow = function(str) {
  let date = str.split("-");
  let year = parseInt(date[0]),
    month = parseInt(date[1]),
    day = parseInt(date[2]);
  if (month > 12 || month < 1 || day > getMonthDays(year, month))
    return "日期不合法";
  day += 1;
  if (day <= getMonthDays(year, month)) {
    return year + "-" + zero(month) + "-" + zero(day);
  }
  month += 1;
  if (month < 13) {
    return year + "-" + zero(month) + "-" + "01";
  }
  year += 1;
  return year + "-" + "01" + "-" + "01";
};
/**
 * 获取前n天日期
 * @param {string} n  当前日期
 * @return {string} 前n天日期
 */
export const beforeDay = function(date, n) {
  if (date.split("-").length < 3) return "日期格式错误";
  let res = dateFormat(date);
  n = parseInt(n);
  while (n--) {
    res = getYesterday(res);
  }
  return res;
};
/**
 * 获取后n天日期
 * @param {string} n  当前日期
 * @return {string} 后n天日期
 */
export const afterDay = function(date, n) {
  if (date.split("-").length < 3) return "日期格式错误";
  let res = dateFormat(date);
  while (n--) {
    res = getTomorrow(res);
  }
  return res;
};
