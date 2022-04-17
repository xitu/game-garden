package com.wjbgn.gobang.server.manmachine.service;

import com.wjbgn.gobang.server.enums.AIChessScoreChildEnum;
import com.wjbgn.gobang.server.enums.ChessScoreEnum;
import com.wjbgn.gobang.server.enums.PlayerChessScoreChildEnum;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 棋局方向分析抽象类
 *
 * @author weirx
 * @date 2022/04/01 18:41
 **/
public abstract class AbstractChessDirectionAnalysis {

    public abstract Map<String, Object> analysis(Integer[][] integers, boolean flag);

    public Map<String, Object> analysis(ChessScoreEnum chessScoreEnum, String join, boolean flag) {

        join = this.handleBorder(join);
        Map<String, Object> map = new HashMap<>();

        if (flag) {
            List<PlayerChessScoreChildEnum> playerChessScoreChildEnums = PlayerChessScoreChildEnum.getByChessScoreEnum(chessScoreEnum);
            for (PlayerChessScoreChildEnum c : playerChessScoreChildEnums) {
                String type = c.getType();
                if (join.contains(type)) {
                    map.put("score", chessScoreEnum.getScore());
                    map.put("type", chessScoreEnum.getCode());
                    map.put("str", c.getType());
                }
            }
        } else {
            List<AIChessScoreChildEnum> aiChessScoreChildEnums = AIChessScoreChildEnum.getByChessScoreEnum(chessScoreEnum);
            for (AIChessScoreChildEnum c : aiChessScoreChildEnums) {
                String type = c.getType();
                if (type.equals(AIChessScoreChildEnum.O_O_Z_O_O.getType())){
                    break;
                }
                if (join.contains(type)) {
                    //如果玩家冲四了，那么分数要给大于自己可能活四的情况
                    map.put("score", chessScoreEnum.getCode().equals(ChessScoreEnum.CHONG_4) ? chessScoreEnum.getScore() * 2 : chessScoreEnum.getScore());
                    map.put("type", chessScoreEnum.getCode());
                    map.put("str", c.getType());
                }
            }
        }
        return map;
    }

    public String handleBorder(String join) {
        if (join.indexOf("1") == 0) {
            join = "3" + join;
        }
        if (join.lastIndexOf("1") == join.length() - 1) {
            join = join + "3";
        }
        return join;
    }
}
