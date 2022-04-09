package com.wjbgn.gobang.server.enums;

import java.util.ArrayList;
import java.util.List;

/**
 * 棋局威胁类型枚举
 *
 * @author weirx
 * @date w0ww/03/3b b6:08
 **/
public enum ChessScoreChildEnum {
    /**
     * 连五
     */
    ONE_ONE_ONE_ONE_ONE("bbbbb", ChessScoreEnum.LIAN_5),
    /**
     * 活四
     */
    ZERO_ONE_ONE_ONE_ONE_ZERO("0bbbb0", ChessScoreEnum.HUO_4),
    /**
     * 冲四
     */
    TWO_ONE_ONE_ONE_ONE_ZERO("wbbbb0", ChessScoreEnum.CHONG_4),
    ZERO_ONE_ONE_ONE_ONE_TWO("0bbbbw", ChessScoreEnum.CHONG_4),
    ONE_ZERO_ONE_ONE_ONE("b0bbb", ChessScoreEnum.CHONG_4),
    ONE_ONE_ONE_ZERO_ONE("bbb0b", ChessScoreEnum.CHONG_4),
    O_O_Z_O_O("bb0bb", ChessScoreEnum.CHONG_4),
    ZBZBBBW("0b0bbbw", ChessScoreEnum.CHONG_4),
    WBBBZBZ("wbbb0b0", ChessScoreEnum.CHONG_4),

    /**
     * 活三
     */
    ONE_ONE_ONE("0bbb0", ChessScoreEnum.HUO_3),
    ONE_ZERO_ONE_ONE("0b0bb0", ChessScoreEnum.HUO_3),
    ONE_ONE_ZERO_ONE_ZERO("0bb0b0", ChessScoreEnum.HUO_3),

    /**
     * 眠三
     */
    ZERO_ONE_ONE_ONE("0bbb3", ChessScoreEnum.MIAN_3),
    ONE_ONE_ONE_ZERO("3bbb0", ChessScoreEnum.MIAN_3),

    O_O_Z_O_Z("3bb0b0", ChessScoreEnum.MIAN_3),
    O_Z_O_O_Z("3b0bb0", ChessScoreEnum.MIAN_3),
    Z_O_Z_O_O("0b0bb3", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O("0bb0b3", ChessScoreEnum.MIAN_3),

    ZERO_ONE_ONE_ONE_TWO("0bbbw", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO("wbbb0", ChessScoreEnum.MIAN_3),

    ZERO_ZERO_ONE_ONE_ONE_TWO("00bbbw", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO_ZERO("wbbb00", ChessScoreEnum.MIAN_3),

    TOW_ONE_ONE_ZERO_ONE_ZERO("wbb0b0", ChessScoreEnum.MIAN_3),
    ZERO_ONE_ZERO_ONE_ONE_TOW("0b0bbw", ChessScoreEnum.MIAN_3),

    T_O_Z_O_O_Z("wb0bb0", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O_T("0bb0bw", ChessScoreEnum.MIAN_3),

    ONE_ONE_ZERO_ZERO_ONE("bb00b", ChessScoreEnum.MIAN_3),
    ONE_ZERO_ZERO_ONE_ONE("b00bb", ChessScoreEnum.MIAN_3),

    ONE_ZERO_ONE_ZERO_ONE("b0b0b", ChessScoreEnum.MIAN_3),
    TOW_ZERO_ONE_ONE_ONE_ZERO_TWO("w0bbb0w", ChessScoreEnum.MIAN_3),


    /**
     * 活二
     */
    Z_ONE_ONE_Z("0bb0", ChessScoreEnum.HUO_2),
    Z_Z_ONE_ONE_Z_Z("00bb00", ChessScoreEnum.HUO_2),
    ONE_ZERO_ONE("0b0b0", ChessScoreEnum.HUO_2),
//    ONE_ZERO_ZERO_ONE("b00b", ChessScoreEnum.HUO_2),
    /**
     * 眠二
     */
    ONE_ONE_Z_Z_Z("3bb000", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z_Z("3bb00", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z("3bb0", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE("000bb3", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE("00bb3", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE("0bb3", ChessScoreEnum.MIAN_2),

    O_Z__O_Z("3b0b0", ChessScoreEnum.MIAN_2),
    Z__O_Z_O("0b0b3", ChessScoreEnum.MIAN_2),

    TWO_ONE_ONE_Z_Z_Z("wbb000", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z_Z("wbb00", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z("wbb0", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE_TWO("000bbw", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE_TWO("00bbw", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE_TWO("0bbw", ChessScoreEnum.MIAN_2),

    ONE_ZERO_ZERO_ZERO_ONE("b000b", ChessScoreEnum.MIAN_2),

    TWO_ONE_ZERO_ZERO_ONE_Z("wb00b0", ChessScoreEnum.MIAN_2),
    Z_ONE_ZERO_ZERO_ONE_TWO("0b00bw", ChessScoreEnum.MIAN_2),

    TWO_ONE_ZERO_ONE_Z_Z("wb0b00", ChessScoreEnum.MIAN_2),
    TWO_ONE_ZERO_ONE_Z("wb0b0", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ZERO_ONE_TWO("00b0bw", ChessScoreEnum.MIAN_2),
    Z_ONE_ZERO_ONE_TWO("0b0bw", ChessScoreEnum.MIAN_2),

    /**
     * 单子
     */
    BORDER_ONE_BORDER("3b3", ChessScoreEnum.ONE_CHESS),
    ONE_("0b3", ChessScoreEnum.ONE_CHESS),
    ONE_Z("3b0", ChessScoreEnum.ONE_CHESS),
    Z_ONE_Z("0b0", ChessScoreEnum.ONE_CHESS);
    private String type;

    public static List<ChessScoreChildEnum> getByChessScoreEnum(ChessScoreEnum chessScoreEnum) {
        List<ChessScoreChildEnum> list = new ArrayList<>();
        for (ChessScoreChildEnum chessScoreChildEnum : ChessScoreChildEnum.values()) {
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

    ChessScoreChildEnum(String type, ChessScoreEnum chessScoreEnum) {
        this.type = type;
        this.chessScoreEnum = chessScoreEnum;
    }

    private ChessScoreEnum chessScoreEnum;

}
