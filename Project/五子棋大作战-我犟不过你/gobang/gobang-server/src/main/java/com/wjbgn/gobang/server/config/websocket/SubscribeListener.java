package com.wjbgn.gobang.server.config.websocket;

import cn.hutool.core.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

import javax.websocket.Session;
import java.io.IOException;

/**
 * @description： redis监听
 * @author：weirx
 * @date：2021/3/22 14:16
 * @version：3.0
 */
@Slf4j
public class SubscribeListener implements MessageListener {

    /**
     * 当前websocket的session
     */
    private Session session;

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    @Override
    public void onMessage(Message message, byte[] bytes) {
        String msg = new String(message.getBody());
        if (ObjectUtil.isNotEmpty(session) && session.isOpen()) {
            try {
                session.getBasicRemote().sendText(msg);
            } catch (IOException e) {
                log.info("发送消息异常，msg = {} , e = {}", msg, e);
            }
        }
    }
}
