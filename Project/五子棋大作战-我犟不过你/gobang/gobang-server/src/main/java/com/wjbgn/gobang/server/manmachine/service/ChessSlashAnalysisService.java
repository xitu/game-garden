package com.wjbgn.gobang.server.manmachine.service;

import com.wjbgn.gobang.server.enums.ChessScoreEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 棋局斜向分析
 *
 * @author weirx
 * @date 2022/04/01 18:45
 **/
@Slf4j
@Service
public class ChessSlashAnalysisService extends AbstractChessDirectionAnalysis {


    @Override
    public Map<String, Object> analysis(Integer[][] integers, boolean flag) {

        return this.slashAnalysis(integers,flag);
    }

    public Map<String, Object> slashAnalysis(Integer[][] integers, boolean flag) {
        Map<String, Object> map = new HashMap<>();
        int n = 15;
        for (int i = 0; i < 2 * n - 1; i++) {
            String str = "";
            for (int j = 0; j < n; j++) {
                if ((i - j) >= 0 && (i - j) < n) {
                    str += integers[j][i - j];
                }
                for (ChessScoreEnum chessScoreEnum : ChessScoreEnum.values()) {
                    Map<String, Object> slash = this.analysis(chessScoreEnum, str,flag);
                    if (!slash.isEmpty()) {
                        map.put("SLASH_" + i +"_"+ chessScoreEnum.getCode(), slash);
                    }
                }
            }

        }
        return map;
    }
}