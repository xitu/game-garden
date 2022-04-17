package com.wjbgn.gobang.server.enums;

import java.util.ArrayList;
import java.util.List;

/**
 * 棋局威胁类型枚举
 *
 * @author weirx
 * @date w0ww/03/3b b6:08
 **/
public enum AIChessScoreChildEnum {
    /**
     * 连五
     */
    ONE_ONE_ONE_ONE_ONE("22222", ChessScoreEnum.LIAN_5),
    /**
     * 活四
     */
    ZERO_ONE_ONE_ONE_ONE_ZERO("022220", ChessScoreEnum.HUO_4),
    /**
     * 冲四
     */
    TWO_ONE_ONE_ONE_ONE_ZERO("122220", ChessScoreEnum.CHONG_4),
    ZERO_ONE_ONE_ONE_ONE_TWO("022221", ChessScoreEnum.CHONG_4),
//    ONE_ZERO_ONE_ONE_ONE("20222", ChessScoreEnum.CHONG_4),
//    ONE_ONE_ONE_ZERO_ONE("22202", ChessScoreEnum.CHONG_4),
    O_O_Z_O_O("22022", ChessScoreEnum.CHONG_4),
//    ZBZ2221("0202221", ChessScoreEnum.CHONG_4),
//    W222ZBZ("1222020", ChessScoreEnum.CHONG_4),

    /**
     * 活三
     */
    ONE_ONE_ONE("02220", ChessScoreEnum.HUO_3),
    ONE_ZERO_ONE_ONE("020220", ChessScoreEnum.HUO_3),
    ONE_ONE_ZERO_ONE_ZERO("022020", ChessScoreEnum.HUO_3),

    /**
     * 眠三
     */
    ZERO_ONE_ONE_ONE("02223", ChessScoreEnum.MIAN_3),
    ONE_ONE_ONE_ZERO("32220", ChessScoreEnum.MIAN_3),

    O_O_Z_O_Z("322020", ChessScoreEnum.MIAN_3),
    O_Z_O_O_Z("320220", ChessScoreEnum.MIAN_3),
    Z_O_Z_O_O("020223", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O("022023", ChessScoreEnum.MIAN_3),

    ZERO_ONE_ONE_ONE_TWO("02221", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO("12220", ChessScoreEnum.MIAN_3),

    ZERO_ZERO_ONE_ONE_ONE_TWO("002221", ChessScoreEnum.MIAN_3),
    TOW_ONE_ONE_ONE_ZERO_ZERO("122200", ChessScoreEnum.MIAN_3),

    TOW_ONE_ONE_ZERO_ONE_ZERO("122020", ChessScoreEnum.MIAN_3),
    ZERO_ONE_ZERO_ONE_ONE_TOW("020221", ChessScoreEnum.MIAN_3),

    T_O_Z_O_O_Z("120220", ChessScoreEnum.MIAN_3),
    Z_O_O_Z_O_T("022021", ChessScoreEnum.MIAN_3),

    ONE_ONE_ZERO_ZERO_ONE("22002", ChessScoreEnum.MIAN_3),
    ONE_ZERO_ZERO_ONE_ONE("20022", ChessScoreEnum.MIAN_3),

    ONE_ZERO_ONE_ZERO_ONE("20202", ChessScoreEnum.MIAN_3),
    TOW_ZERO_ONE_ONE_ONE_ZERO_TWO("2022202", ChessScoreEnum.MIAN_3),


    /**
     * 活二
     */
    Z_ONE_ONE_Z("0220", ChessScoreEnum.HUO_2),
    Z_Z_ONE_ONE_Z_Z("002200", ChessScoreEnum.HUO_2),
    ONE_ZERO_ONE("02020", ChessScoreEnum.HUO_2),
//    ONE_ZERO_ZERO_ONE("b00b", ChessScoreEnum.HUO_2),
    /**
     * 眠二
     */
    ONE_ONE_Z_Z_Z("322000", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z_Z("32200", ChessScoreEnum.MIAN_2),
    ONE_ONE_Z("3220", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE("000223", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE("00223", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE("0223", ChessScoreEnum.MIAN_2),

    O_Z__O_Z("31010", ChessScoreEnum.MIAN_2),
    Z__O_Z_O("01013", ChessScoreEnum.MIAN_2),

    TWO_ONE_ONE_Z_Z_Z("122000", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z_Z("12200", ChessScoreEnum.MIAN_2),
    TWO_ONE_ONE_Z("1220", ChessScoreEnum.MIAN_2),
    Z_Z_Z_ONE_ONE_TWO("000221", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ONE_TWO("00221", ChessScoreEnum.MIAN_2),
    Z_ONE_ONE_TWO("0221", ChessScoreEnum.MIAN_2),

//    ONE_ZERO_ZERO_ZERO_ONE("10001", ChessScoreEnum.MIAN_2),
//
//    TWO_ONE_ZERO_ZERO_ONE_Z("120010", ChessScoreEnum.MIAN_2),
//    Z_ONE_ZERO_ZERO_ONE_TWO("010021", ChessScoreEnum.MIAN_2),

    TWO_ONE_ZERO_ONE_Z_Z("120100", ChessScoreEnum.MIAN_2),
    TWO_ONE_ZERO_ONE_Z("12010", ChessScoreEnum.MIAN_2),
    Z_Z_ONE_ZERO_ONE_TWO("002021", ChessScoreEnum.MIAN_2),
    Z_ONE_ZERO_ONE_TWO("02021", ChessScoreEnum.MIAN_2),

    /**
     * 单子
     */
    BORDER_ONE_BORDER("313", ChessScoreEnum.ONE_CHESS),
    ONE_("013", ChessScoreEnum.ONE_CHESS),
    ONE_Z("310", ChessScoreEnum.ONE_CHESS),
    Z_ONE_Z("010", ChessScoreEnum.ONE_CHESS);
    private String type;

    public static List<AIChessScoreChildEnum> getByChessScoreEnum(ChessScoreEnum chessScoreEnum) {
        List<AIChessScoreChildEnum> list = new ArrayList<>();
        for (AIChessScoreChildEnum chessScoreChildEnum : AIChessScoreChildEnum.values()) {
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

    AIChessScoreChildEnum(String type, ChessScoreEnum chessScoreEnum) {
        this.type = type;
        this.chessScoreEnum = chessScoreEnum;
    }

    private ChessScoreEnum chessScoreEnum;

}
