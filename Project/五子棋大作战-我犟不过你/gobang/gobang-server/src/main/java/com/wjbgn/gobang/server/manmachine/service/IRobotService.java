package com.wjbgn.gobang.server.manmachine.service;

import com.wjbgn.gobang.server.utils.Result;

import java.util.Map;

/**
 * @author weirx
 * @date 2022/03/30 16:20
 **/
public interface IRobotService {

    Result analysis(Map<String, Object> map);
}
