package com.wjbgn.gobang.server.enums;

import java.util.ArrayList;
import java.util.List;

/**
 * 棋局威胁类型枚举
 *
 * @author weirx
 * @date w0ww/03/3b b6:08
 **/
public enum PlayerChessScoreChildEnum {
    /**
     * 连五
     */
    ONE_ONE_ONE_ONE_ONE("11111", ChessScoreEnum.LIAN_5),
    /**
     * 活四
     */
    ZERO_ONE_ONE_ONE_ONE_ZERO("011110", ChessScoreEnum.HUO_4),
    /**
     * 冲四
     */
    TWO_ONE_ONE_ONE_ONE_ZERO("211110", ChessScoreEnum.CHONG_4),
    ZERO_ONE_ONE_ONE_ONE_TWO("011112", ChessScoreEnum.CHONG_4),
//    ONE_ZERO_ONE_ONE_ONE("10111", ChessScoreEnum.CHONG_4),
//    ONE_ONE_ONE_ZERO_ONE("11101", ChessScoreEnum.CHONG_4),
    O_O_Z_O_O("11011", ChessScoreEnum.CHONG_4),
//    ZBZ1112("0101112", ChessScoreEnum.CHONG_4),
//    W111ZBZ("2111010", ChessScoreEnum.CHONG_4),

    /**
     * 活三
     */
    ONE_ONE_ONE("01110", ChessScoreEnum.HUO_3),
    ONE_ZERO_ONE_ONE("010110", ChessScoreEnum.HUO_3),
    ONE_ONE_ZERO_ONE_ZERO("011010", ChessScoreEnum.HUO_3),

    /**
     * 眠三
     */
    ZERO_ONE_ONE_ONE("01113", ChessScoreEnum.MIAN_3),
    ONE_ONE_ONE_ZERO("31110", ChessScoreEnum.MIAN_3),

    O_O_Z_O_Z("311010", ChessScoreEnum.MIAN_3),
    O_Z_O_O_Z("310110", ChessScoreEnum.MIAN_3),
    Z_O_Z_O_O("010113", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O("011013", ChessScoreEnum.MIAN_3),

    ZERO_ONE_ONE_ONE_TWO("01112", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO("21110", ChessScoreEnum.MIAN_3),

    ZERO_ZERO_ONE_ONE_ONE_TWO("001112", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO_ZERO("211100", ChessScoreEnum.MIAN_3),

    TOW_ONE_ONE_ZERO_ONE_ZERO("211010", ChessScoreEnum.MIAN_3),
    ZERO_ONE_ZERO_ONE_ONE_TOW("010112", ChessScoreEnum.MIAN_3),

    T_O_Z_O_O_Z("210110", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O_T("011012", ChessScoreEnum.MIAN_3),

    ONE_ONE_ZERO_ZERO_ONE("11001", ChessScoreEnum.MIAN_3),
    ONE_ZERO_ZERO_ONE_ONE("10011", ChessScoreEnum.MIAN_3),

    ONE_ZERO_ONE_ZERO_ONE("10101", ChessScoreEnum.MIAN_3),
    TOW_ZERO_ONE_ONE_ONE_ZERO_TWO("2011102", ChessScoreEnum.MIAN_3),


    /**
     * 活二
     */
    Z_ONE_ONE_Z("0110", ChessScoreEnum.HUO_2),
    Z_Z_ONE_ONE_Z_Z("001100", ChessScoreEnum.HUO_2),
    ONE_ZERO_ONE("01010", ChessScoreEnum.HUO_2),
//    ONE_ZERO_ZERO_ONE("b00b", ChessScoreEnum.HUO_2),
    /**
     * 眠二
     */
    ONE_ONE_Z_Z_Z("311000", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z_Z("31100", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z("3110", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE("000113", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE("00113", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE("0113", ChessScoreEnum.MIAN_2),

    O_Z__O_Z("31010", ChessScoreEnum.MIAN_2),
    Z__O_Z_O("01013", ChessScoreEnum.MIAN_2),

    TWO_ONE_ONE_Z_Z_Z("211000", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z_Z("21100", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z("2110", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE_TWO("000112", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE_TWO("00112", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE_TWO("0112", ChessScoreEnum.MIAN_2),

//    ONE_ZERO_ZERO_ZERO_ONE("10001", ChessScoreEnum.MIAN_2),
//
//    TWO_ONE_ZERO_ZERO_ONE_Z("210010", ChessScoreEnum.MIAN_2),
//    Z_ONE_ZERO_ZERO_ONE_TWO("010012", ChessScoreEnum.MIAN_2),

    TWO_ONE_ZERO_ONE_Z_Z("210100", ChessScoreEnum.MIAN_2),
    TWO_ONE_ZERO_ONE_Z("21010", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ZERO_ONE_TWO("001012", ChessScoreEnum.MIAN_2),
    Z_ONE_ZERO_ONE_TWO("01012", ChessScoreEnum.MIAN_2),

    /**
     * 单子
     */
    BORDER_ONE_BORDER("313", ChessScoreEnum.ONE_CHESS),
    ONE_("013", ChessScoreEnum.ONE_CHESS),
    ONE_Z("310", ChessScoreEnum.ONE_CHESS),
    Z_ONE_Z("010", ChessScoreEnum.ONE_CHESS);
    private String type;

    public static List<PlayerChessScoreChildEnum> getByChessScoreEnum(ChessScoreEnum chessScoreEnum) {
        List<PlayerChessScoreChildEnum> list = new ArrayList<>();
        for (PlayerChessScoreChildEnum chessScoreChildEnum : PlayerChessScoreChildEnum.values()) {
            if (chessScoreChildEnum.getChessScoreEnum() == chessScoreEnum) {
                list.add(chessScoreChildEnum);
            }
        }
        return list;
    }

    public String getType() {
        return type;
    }

    public ChessScoreEnum getChessScoreEnum() {
        return chessScoreEnum;
    }

    PlayerChessScoreChildEnum(String type, ChessScoreEnum chessScoreEnum) {
        this.type = type;
        this.chessScoreEnum = chessScoreEnum;
    }

    private ChessScoreEnum chessScoreEnum;

}
