package com.wjbgn.gobang.server.online.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.wjbgn.gobang.server.online.service.IOnlineService;
import com.wjbgn.gobang.server.utils.RedisUtil;
import com.wjbgn.gobang.server.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author weirx
 * @date 2022/04/05 11:30
 **/
@Slf4j
@Service
public class OnlineServiceImpl implements IOnlineService {

    public final static String MATCHING = "matching";

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public Result matching(Map<String, Object> map) {
        Object username = map.get("username");
        if (ObjectUtil.isEmpty(username)){
            return Result.success();
        }
        // 修改当前用户状态为匹配中
        redisUtil.setFieldToHash(MATCHING, username.toString(),1);
        return Result.success(201);
    }
}
