package com.wjbgn.gobang.server.manmachine.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.wjbgn.gobang.server.manmachine.service.IRobotCalculateService;
import com.wjbgn.gobang.server.manmachine.service.IRobotService;
import com.wjbgn.gobang.server.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author weirx
 * @date 2022/03/30 16:20
 **/
@Slf4j
@Service
public class RobotService2Impl implements IRobotService {

    @Autowired
    private IRobotCalculateService robotCalculateService;

    @Override
    public Result analysis(Map<String, Object> map) {
        Object chessPosition = map.get("chessPosition");
        List<ArrayList> arrayLists = JSONArray.parseArray(JSONObject.toJSONString(chessPosition), ArrayList.class);

        // 获取棋局情况
        Integer[][] integers = new Integer[arrayLists.size()][arrayLists.size()];
        ArrayList[] arrayLists1 = arrayLists.toArray(new ArrayList[0]);
        for (int i = 0; i < arrayLists1.length; i++) {
            List<Integer> integerList = JSONArray.parseArray(JSONObject.toJSONString(arrayLists1[i]), Integer.class);
            for (int j = 0; j < integerList.size(); j++) {
                integers[i][j] = integerList.get(j);
            }
        }

        // 模拟电脑下棋，遍历整个棋盘，空位置就下棋，然后计算得分，
        Map<String, Integer> playerScoreMap = this.calculate(integers, 2);

        // 获取电脑模拟落子，玩家得分
        List<Map.Entry<String, Integer>> playerList = new ArrayList<>(playerScoreMap.entrySet());
        Collections.sort(playerList, Comparator.comparingInt(Map.Entry::getValue));

        Map<String, Integer> finalMap = new HashMap<>();
        for (Map.Entry entry : playerList) {
            String[] split = entry.getKey().toString().split(",");
            integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 2;
            int calculate = robotCalculateService.calculate(integers, false);
            integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 0;
            if (calculate > Integer.parseInt(entry.getValue().toString())) {
                int i = calculate - Integer.parseInt(entry.getValue().toString());
                finalMap.put(entry.getKey().toString(), i);
            }
        }
        List<Map.Entry<String, Integer>> finalList = new ArrayList<>(finalMap.entrySet());
        Collections.sort(finalList, Comparator.comparingInt(Map.Entry::getValue));

        if (finalList.size() == 0) {
            return Result.success("", suitablePosition(playerList, playerList.get(0).getValue(), integers));
        }
        return Result.success("", finalList.get(finalList.size() - 1).getKey());
    }


    public Map<String, Integer> calculate(Integer[][] integers, int who) {
        // 遍历整个棋盘，空位置就下棋，然后计算得分，
        Map<String, Integer> playerScoreMap = new HashMap<>();
        for (int i = 0; i < 15; i++) {
            for (int j = 0; j < 15; j++) {
                if (integers[i][j] == 0) {
                    // 计算该落点，玩家的得分情况
                    integers[i][j] = who;
                    playerScoreMap.put(i + "," + j, robotCalculateService.calculate(integers, true));
                    integers[i][j] = 0;
                }
            }
        }
        return playerScoreMap;
    }

    /**
     * 电脑可能落子的相同分数的位置，找到玩家下一步可能得分最高的位置进行落子
     *
     * @param list
     * @param point
     * @param integers
     * @return java.util.Map<java.lang.String, java.lang.Integer>
     * @author weirx
     * @date: 2022/4/9
     */
    public String suitablePosition(List<Map.Entry<String, Integer>> list, Integer point, Integer[][] integers) {
        Map<String, Integer> map = new HashMap<>();
        list.forEach(l -> {
            if (l.getValue().equals(point)) {
                String[] split = l.getKey().split(",");
                integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 1;
                Map<String, Integer> calculate = this.calculate(integers, 1);

                List<Map.Entry<String, Integer>> playerList = new ArrayList<>(calculate.entrySet());
                Collections.sort(playerList, Comparator.comparingInt(Map.Entry::getValue));

                integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 0;

                map.put(l.getKey(), playerList.get(playerList.size() - 1).getValue());
            }
        });

        List<Map.Entry<String, Integer>> finalList = new ArrayList<>(map.entrySet());
        Collections.sort(finalList, Comparator.comparingInt(Map.Entry::getValue));
        return finalList.get(finalList.size() - 1).getKey();
    }
}
