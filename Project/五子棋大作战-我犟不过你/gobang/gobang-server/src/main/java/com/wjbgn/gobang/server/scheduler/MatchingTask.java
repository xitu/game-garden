package com.wjbgn.gobang.server.scheduler;

import com.wjbgn.gobang.server.utils.RedisUtil;
import com.wjbgn.gobang.server.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author weirx
 * @date 2022/04/05 12:50
 **/
@Slf4j
@Component
public class MatchingTask {

    public final static String MATCHING = "matching";

    private static final String TOPIC_PREFIX = "MESSAGE_";
    @Autowired
    private RedisUtil redisUtil;

    @Scheduled(cron = "*/5 * * * * ?")
    public void execute() {
        String first = null;
        List<String> userList = new ArrayList<>();
        Map<Object, Object> hash = redisUtil.getHash(MATCHING);
        if (hash.size() >= 2) {
            hash.keySet().forEach(k -> {
                redisUtil.deleteHashByFields(MATCHING, k.toString());
                userList.add(k.toString());
            });
        }
        for (String username : userList) {
            if (StringUtils.isBlank(first)){
                first = username;
            }
            Map<String,Object> result = new HashMap<>();
            result.put("user",userList);
            result.put("first",first);
            redisUtil.publish(TOPIC_PREFIX + username, Result.success("",result));
        }
    }
}
