var sqlMap = {
  getScoreList:"select id,username,juejinpage,score,submittime from score_table order by score limit 20",
  addScore:"insert into score_table set ?",
};
module.exports = sqlMap;
