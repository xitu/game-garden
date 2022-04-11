//package com.wjbgn.gobang.server.manmachine.service.impl;
//
//import cn.hutool.core.util.RandomUtil;
//import com.alibaba.fastjson.JSONArray;
//import com.alibaba.fastjson.JSONObject;
//import com.wjbgn.gobang.server.manmachine.service.IRobotCalculateService;
//import com.wjbgn.gobang.server.manmachine.service.IRobotService;
//import com.wjbgn.gobang.server.utils.Result;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
///**
// * @author weirx
// * @date 2022/03/30 16:20
// **/
//@Slf4j
//@Service
//public class RobotServiceImpl implements IRobotService {
//
//    @Autowired
//    private IRobotCalculateService robotCalculateService;
//
//    @Override
//    public Result analysis(Map<String, Object> map) {
//        Object chessPosition = map.get("chessPosition");
//        List<ArrayList> arrayLists = JSONArray.parseArray(JSONObject.toJSONString(chessPosition), ArrayList.class);
//
//        // 获取棋局情况
//        Integer[][] integers = new Integer[arrayLists.size()][arrayLists.size()];
//        ArrayList[] arrayLists1 = arrayLists.toArray(new ArrayList[0]);
//        for (int i = 0; i < arrayLists1.length; i++) {
//            List<Integer> integerList = JSONArray.parseArray(JSONObject.toJSONString(arrayLists1[i]), Integer.class);
//            for (int j = 0; j < integerList.size(); j++) {
//                integers[i][j] = integerList.get(j);
//            }
//        }
//
//        // 遍历整个棋盘，空位置就下棋，然后计算得分，
//        Map<String, Integer> playerScoreMap = new HashMap<>();
//        for (int i = 0; i < 15; i++) {
//            for (int j = 0; j < 15; j++) {
//                if (integers[i][j] == 0) {
//                    // 计算该落点，玩家的得分情况
//                    integers[i][j] = 2;
//                    playerScoreMap.put(i + "," + j, robotCalculateService.calculate(integers, true));
//                    integers[i][j] = 0;
//                }
//            }
//        }
//        // 获取电脑模拟落子，玩家得分
//        List<Map.Entry<String, Integer>> playerList = new ArrayList<>(playerScoreMap.entrySet());
//        Collections.sort(playerList, Comparator.comparingInt(Map.Entry::getValue));
//
//        Map<String, Integer> finalMap = new HashMap<>();
//        for (Map.Entry entry : playerList) {
//            String[] split = entry.getKey().toString().split(",");
//            integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 2;
//            int calculate = robotCalculateService.calculate(integers, false);
//            integers[Integer.parseInt(split[0])][Integer.parseInt(split[1])] = 0;
//            if (calculate > Integer.parseInt(entry.getValue().toString())) {
//                finalMap.put(entry.getKey().toString(), calculate - Integer.parseInt(entry.getValue().toString()));
//            }
//        }
//        List<Map.Entry<String, Integer>> finalList = new ArrayList<>(finalMap.entrySet());
//        Collections.sort(finalList, Comparator.comparingInt(Map.Entry::getValue));
//
//        if (finalList.size() == 0) {
//            return Result.success("", suitablePosition(playerList, playerList.get(0).getValue()));
//        }
//        return Result.success("", suitablePosition(finalList, finalList.get(finalList.size() - 1).getValue()));
//    }
//
//    /**
//     * 目前分数线头的点，按照随机处理
//     *
//     * @param list
//     * @param point
//     * @return java.lang.String
//     * @author weirx
//     * @date: 2022/4/6
//     */
//    public String randomPosition(List<Map.Entry<String, Integer>> list, Integer point) {
//        List<String> samePointList = new ArrayList<>();
//        list.forEach(l -> {
//            if (l.getValue().equals(point)) {
//                samePointList.add(l.getKey());
//            }
//        });
//
//        return samePointList.get(RandomUtil.randomInt(samePointList.size()));
//    }
//
//    /**
//     * 获取相同分数情况下，最靠近中间位置的点下
//     *
//     * @param list
//     * @param point
//     * @return java.lang.String
//     * @author weirx
//     * @date: 2022/4/9
//     */
//    public String suitablePosition(List<Map.Entry<String, Integer>> list, Integer point) {
//        Map<String, Integer> map = new HashMap<>();
//        List<String> samePointList = new ArrayList<>();
//        list.forEach(l -> {
//            if (l.getValue().equals(point)) {
//                String[] strings = l.getKey().split(",");
//                map.put(l.getKey(), Math.abs(Integer.parseInt(strings[0]) - 7) + Math.abs(Integer.parseInt(strings[0]) - 7));
//            }
//        });
//        List<Map.Entry<String, Integer>> finalList = new ArrayList<>(map.entrySet());
//        Collections.sort(finalList, Comparator.comparingInt(Map.Entry::getValue));
//
//        return finalList.get(0).getKey();
//    }
//}
