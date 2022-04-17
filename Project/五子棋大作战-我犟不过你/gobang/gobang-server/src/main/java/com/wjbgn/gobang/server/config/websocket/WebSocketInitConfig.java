package com.wjbgn.gobang.server.config.websocket;

import com.wjbgn.gobang.server.utils.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

/**
 * 启动清除在线用户
 *
 * @author weirx
 * @date 2022/03/23 11:39
 **/
@Slf4j
@Configuration
public class WebSocketInitConfig implements ApplicationRunner {


    @Autowired
    private RedisUtil redisUtil;


    @Override
    public void run(ApplicationArguments args) {
        redisUtil.deleteObject(WebSocketServer.USER_COUNT);
    }
}
