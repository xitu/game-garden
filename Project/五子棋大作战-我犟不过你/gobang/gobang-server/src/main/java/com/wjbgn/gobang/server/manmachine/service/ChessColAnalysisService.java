package com.wjbgn.gobang.server.manmachine.service;

import com.wjbgn.gobang.server.enums.ChessScoreEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 棋局纵向分析
 *
 * @author weirx
 * @date 2022/04/01 18:45
 **/
@Slf4j
@Service
public class ChessColAnalysisService extends AbstractChessDirectionAnalysis {

    @Override
    public Map<String, Object> analysis(Integer[][] integers, boolean flag) {

        Map<String, Object> map = new HashMap<>();
        // 竖向判断
        for (int i = 0; i < 15; i++) {
            Map<String, Object> col = this.analysis(integers, i,flag);
            if (!col.isEmpty()) {
                map.put("COL_" + i, col);
            }
        }
        return map;
    }


    /**
     * 竖向分析
     *
     * @param integers
     * @param index
     * @return java.util.Map<java.lang.String, java.lang.Object>
     * @author weirx
     * @date: 2022/4/2
     */
    public Map<String, Object> analysis(Integer[][] integers, int index, boolean flag) {
        Map<String, Object> map = new HashMap<>();
        String join = StringUtils.join(integers[index], "");
        for (ChessScoreEnum chessScoreEnum : ChessScoreEnum.values()) {
            Map<String, Object> col = this.analysis(chessScoreEnum, join,flag);
            if (!col.isEmpty()) {
                map.put("COL_" + chessScoreEnum.getCode(), col);
            }
        }
        return map;
    }
}
