package cn.a2q.chess.bean;

import java.util.ArrayList;
import java.util.List;
/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 */
public class RoleBean {

    public static final int ROLE_BLANK = 0;
    public static final int ROLE_SOLDIER = 1;
    public static final int ROLE_GENERAL = 2;

    private String name;
    private int roleCode;

    public RoleBean(String name, int roleCode) {
        this.name = name;
        this.roleCode = roleCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(int roleCode) {
        this.roleCode = roleCode;
    }

    public static List<RoleBean> getRoles(){
        List<RoleBean> roleBeans = new ArrayList<>();
        roleBeans.add(new RoleBean("将军", ROLE_GENERAL));
        roleBeans.add(new RoleBean("士兵", ROLE_SOLDIER));
        return roleBeans;
    }

    public static String[] getNames(){
        List<RoleBean> roleBeans = getRoles();
        int size = roleBeans.size();
        String[] roles = new String[size];
        for (int i = 0; i<size; i++){
            RoleBean roleBean = roleBeans.get(i);
            roles[i] = roleBean.getName();
        }
        return roles;
    }
}
