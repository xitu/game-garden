package cn.a2q.chess.bean;

import java.util.ArrayList;
import java.util.List;
/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 */
public class MapBean {


    public static int[][] Map_5 = {
            {1,1,1,1,1}
            ,{1,1,1,1,1}
            ,{0,0,0,0,0}
            ,{0,2,0,2,0}
            ,{0,0,0,0,0}
    };

    public static int[][] Map_6 = {
            {1,1,1,1,1,1}
            ,{1,1,1,1,1,1}
            ,{1,1,1,1,1,1}
            ,{0,0,0,0,0,0}
            ,{0,0,2,2,0,0}
            ,{0,0,0,0,0,0}
    };

    public static int[][] Map_7 = {
            {1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1}
            ,{0,0,0,0,0,0,0}
            ,{0,0,2,2,2,0,0}
            ,{0,0,0,0,0,0,0}
    };

    public static int[][] Map_8 = {
            {1,1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1,1}
            ,{1,1,1,1,1,1,1,1}
            ,{0,0,0,0,0,0,0,0}
            ,{0,0,2,2,2,2,0,0}
            ,{0,0,0,0,0,0,0,0}
    };

    private String name;
    private int[][] map;
    private int lineNum;

    public MapBean(String name, int[][] map, int lineNum) {
        this.name = name;
        this.map = map;
        this.lineNum = lineNum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int[][] getMap() {
        return map;
    }

    public void setMap(int[][] map) {
        this.map = map;
    }

    public int getLineNum() {
        return lineNum;
    }

    public void setLineNum(int lineNum) {
        this.lineNum = lineNum;
    }

    public static List<MapBean> getMaps(){
        List<MapBean> mapBeans = new ArrayList<>();
        mapBeans.add(new MapBean("五线战场", Map_5,5));
        mapBeans.add(new MapBean("六线战场", Map_6,6));
        mapBeans.add(new MapBean("七线战场", Map_7,7));
        mapBeans.add(new MapBean("八线战场", Map_8,8));
        return mapBeans;
    }

    public static String[] getNames(){
        List<MapBean> mapBeans = getMaps();
        int size = mapBeans.size();
        String[] lines = new String[size];
        for (int i = 0; i<size; i++){
            MapBean mapBean = mapBeans.get(i);
            lines[i] = mapBean.getName();
        }
        return lines;
    }
}
