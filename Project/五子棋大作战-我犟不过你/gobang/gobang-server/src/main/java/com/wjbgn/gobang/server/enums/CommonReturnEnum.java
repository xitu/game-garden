package com.wjbgn.gobang.server.enums;

/**
 * Description: 公共通用枚举返回
 * Create Date: 2020/6/19
 * Modified By：<br>
 * Modified Date：<br>
 * Why & What is modified：<br>
 *
 * @author weirx
 * @version 1.0
 */
public enum CommonReturnEnum {

    SUCCESS(0, "操作成功"),

    FAILED(500, "操作失败"),

    UNAUTHORIZED(401 , "未授权");


    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    private int code;

    private String name;

    CommonReturnEnum(int code, String name) {
        this.code = code;
        this.name = name;
    }

    /**
     * @description: 根据code获取name
     *
     * @param code
     * @return java.lang.String
     * @author weirx
     * @date 2020/6/19
     */
    public static String getNameByCode(String code) {
        for (CommonReturnEnum platformFree : CommonReturnEnum.values()) {
            if (code.equals(platformFree.getCode())) {
                return platformFree.getName();
            }
        }
        return null;
    }

}
