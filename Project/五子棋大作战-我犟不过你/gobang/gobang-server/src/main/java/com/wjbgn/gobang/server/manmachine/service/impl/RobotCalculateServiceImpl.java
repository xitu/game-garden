package com.wjbgn.gobang.server.manmachine.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.wjbgn.gobang.server.manmachine.service.*;
import com.wjbgn.gobang.server.enums.ChessScoreEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

/**
 * 机器人计算如何下棋
 *
 * @author weirx
 * @date 2022/04/01 16:24
 **/
@Slf4j
@Service
public class RobotCalculateServiceImpl implements IRobotCalculateService {

    @Autowired
    private ChessColAnalysisService chessColAnalysisService;

    @Autowired
    private ChessRowAnalysisService chessRowAnalysisService;

    @Autowired
    private ChessSlashAnalysisService chessSlashAnalysisService;

    @Autowired
    private ChessBackSlashAnalysisService chessBackSlashAnalysisService;

    @Override
    public int calculate(Integer[][] integers,boolean flag) {

        // 横
        Map<String, Object> row = chessRowAnalysisService.analysis(integers,flag);
        // 竖
        Map<String, Object> col = chessColAnalysisService.analysis(integers,flag);
        // 斜
        Map<String, Object> slash = chessSlashAnalysisService.analysis(integers,flag);
//        // 反斜
        Map<String, Object> backSlash = chessBackSlashAnalysisService.analysis(integers,flag);

        // 计算总得分
        int sum = this.sum(col,flag) + this.sum(slash,flag) + this.sum(row,flag) + this.sum(backSlash,flag);
        return sum;
    }

    private Integer sum(Map<String, Object> map,boolean flag) {
        AtomicReference<Integer> sum = new AtomicReference<>(0);
        map.entrySet().forEach((entry) -> {
            HashMap hashMap = JSONObject.parseObject(JSONObject.toJSONString(entry.getValue()), HashMap.class);
            if (hashMap.get("score") != null) {
                if (entry.getKey().contains(ChessScoreEnum.HUO_3.getCode()) && !flag){
                    sum.updateAndGet(v -> v + Integer.parseInt(hashMap.get("score").toString()) - ChessScoreEnum.HUO_3.getScore());
                }else if(entry.getKey().contains(ChessScoreEnum.HUO_4.getCode()) && !flag){
                    sum.updateAndGet(v -> v + Integer.parseInt(hashMap.get("score").toString())- ChessScoreEnum.HUO_4.getScore());
                }else {
                    sum.updateAndGet(v -> v + Integer.parseInt(hashMap.get("score").toString()));
                }
            } else {
                hashMap.values().forEach(s -> {
                    JSONObject jsonObject = JSONObject.parseObject(JSONObject.toJSONString(s));
                    if (jsonObject.getString("type").equals(ChessScoreEnum.HUO_3.getCode()) &&!flag){
                        sum.updateAndGet(v -> v + jsonObject.getInteger("score") - ChessScoreEnum.HUO_3.getScore()/2);
                    }else if (jsonObject.getString("type").equals(ChessScoreEnum.HUO_4.getCode()) &&!flag){
                        sum.updateAndGet(v -> v + jsonObject.getInteger("score") - ChessScoreEnum.HUO_4.getScore()/2);
                    }else if (jsonObject.getString("type").equals(ChessScoreEnum.CHONG_4.getCode()) &&!flag){
                        sum.updateAndGet(v -> v + jsonObject.getInteger("score") - ChessScoreEnum.CHONG_4.getScore()/2);
                    }else{
                        sum.updateAndGet(v -> v + jsonObject.getInteger("score"));
                    }
                });
            }
        });
        return sum.get();
    }
}
