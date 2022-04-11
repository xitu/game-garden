package com.wjbgn.gobang.server.manmachine.service;

/**
 * 电脑下棋分析service
 *
 * @author weirx
 * @date 2022/04/01 16:22
 **/
public interface IRobotCalculateService {

    int calculate(Integer[][] integers, boolean b);

}
