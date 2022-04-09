package com.wjbgn.gobang.server.enums;

/**
 * 棋局威胁类型枚举
 *
 * @author weirx
 * @date 2022/03/31 16:08
 **/
public enum ChessThreatEnum {
    ONE_ONE_ONE(3, "111", 0),
    ONE_ONE_ONE_ONE(4, "1111", 0),
    ONE_ONE_ZERO_ONE(4, "1101", 3),
    ONE_ZERO_ONE_ONE(4, "1011", 2),
    ONE_ONE_ZERO_ONE_ONE(5, "11011", 3),
    ONE_ZERO_ONE_ONE_ONE(5, "10111", 2),
    ONE_ONE_ONE_ZERO_ONE(5, "11101", 4);


    public Integer getLength() {
        return length;
    }

    public String getType() {
        return type;
    }

    public Integer getOperatePosition() {
        return operatePosition;
    }

    public static Integer getOperatePosition(String type) {
        for (ChessThreatEnum chessThreatEnum:ChessThreatEnum.values()) {
            if (chessThreatEnum.getType().equals(type)){
                return chessThreatEnum.getOperatePosition();
            }
        }
        return null;
    }

    ChessThreatEnum(Integer length, String type, Integer operatePosition) {
        this.length = length;
        this.type = type;
        this.operatePosition = operatePosition;
    }

    private Integer length;

    private String type;

    private Integer operatePosition;

}
