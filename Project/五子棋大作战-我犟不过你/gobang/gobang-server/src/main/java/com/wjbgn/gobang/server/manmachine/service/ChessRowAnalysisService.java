package com.wjbgn.gobang.server.manmachine.service;

import com.wjbgn.gobang.server.enums.ChessScoreEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 棋局横向分析
 *
 * @author weirx
 * @date 2022/04/01 18:44
 **/
@Slf4j
@Service
public class ChessRowAnalysisService extends AbstractChessDirectionAnalysis {
    @Override
    public Map<String, Object> analysis(Integer[][] integers, boolean flag) {

        Map<String, Object> map = new HashMap<>();
        for (int i = 0; i < 15; i++) {
            Integer[][] col = new Integer[15][15];
            for (int j = 0; j < 15; j++) {
                col[i][j] = integers[j][i];
            }
            Map<String, Object> row = this.analysis(col, i,flag);
            if (!row.isEmpty()) {
                map.put("ROW_" + i, row);
            }

        }
        return map;
    }

    public Map<String, Object> analysis(Integer[][] integers, int index, boolean flag) {
        Map<String, Object> map = new HashMap<>();
        String join = StringUtils.join(integers[index], "");
        for (ChessScoreEnum chessScoreEnum : ChessScoreEnum.values()) {
            Map<String, Object> row = this.analysis(chessScoreEnum, join,flag);
            if (!row.isEmpty()){
                map.put("ROW_"+chessScoreEnum.getCode(), row);
            }
        }
        return map;
    }
}
