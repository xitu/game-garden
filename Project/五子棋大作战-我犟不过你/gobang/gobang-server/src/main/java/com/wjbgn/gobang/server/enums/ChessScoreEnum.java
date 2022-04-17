package com.wjbgn.gobang.server.enums;

/**
 * 棋型得分
 *
 * @author weirx
 * @date 2022/04/01 18:07
 **/
public enum ChessScoreEnum {
//    LIAN_5("LIAN_5",1000000),
//    HUO_4("HUO_4",500000),
//    CHONG_4("CHONG_4",20000),
//    HUO_3("HUO_3",10000),
//    HUO_2("HUO_2",3000),
//    MIAN_3("MIAN_3",1000),
//    MIAN_2("MIAN_2",500),
//    ONE_CHESS("ONE_CHESS",10);

    LIAN_5("LIAN_5",1000000),
    HUO_4("HUO_4",50000),
    CHONG_4("CHONG_4",25000),
    HUO_3("HUO_3",6000),
    HUO_2("HUO_2",1000),
    MIAN_3("MIAN_3",500),
    MIAN_2("MIAN_2",300),
    ONE_CHESS("ONE_CHESS",10);

    private String code;

    public String getCode() {
        return code;
    }

    public Integer getScore() {
        return score;
    }

    ChessScoreEnum(String code, Integer score) {
        this.code = code;
        this.score = score;
    }

    private Integer score;
}
