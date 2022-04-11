package com.wjbgn.gobang.server.config.websocket;

import cn.hutool.extra.spring.SpringUtil;
import com.alibaba.fastjson.JSONObject;
import com.wjbgn.gobang.server.utils.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import static com.wjbgn.gobang.server.scheduler.MatchingTask.MATCHING;

/**
 * description: @ServerEndpoint 注解是一个类层次的注解，
 * 它的功能主要是将目前的类定义成一个websocket服务器端,注解的值将被用于监听用户连接的终端访问URL地址,
 * 客户端可以通过这个URL来连接到WebSocket服务器端使用springboot的唯一区别是要@Component声明下，
 * 而使用独立容器是由容器自己管理websocket的，但在springboot中连容器都是spring管理的。
 *
 * @author: weirx
 * @time: 2021/3/22 14:31
 */
@Slf4j
@Component
@ServerEndpoint("/websocket/server/{username}")
public class WebSocketServer {

    private static final String TOPIC_PREFIX = "MESSAGE_";

    public static final String USER_COUNT = "USER_COUNT";

    private RedisMessageListenerContainer redisMessageListenerContainer = SpringUtil.getBean(RedisMessageListenerContainer.class);

    private RedisUtil redisUtil = SpringUtil.getBean(RedisUtil.class);

    private String username;


    /**
     * concurrent包的线程安全Set，用来存放每个客户端对应的webSocket对象。
     * 若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
     */
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();

    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    /**
     * redis监听
     */
    private SubscribeListener subscribeListener;

    /**
     * 连接建立成功调用的方法
     *
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(@PathParam("username") String username, Session session) {
        this.session = session;
        //加入set中
        webSocketSet.add(this);
        //在线数加1
        addOnlineCount();
        log.info("有新连接[" + username + "]加入！当前在线人数为{}", getOnlineCount() == 0 ? 1 : getOnlineCount());
        subscribeListener = new SubscribeListener();
        subscribeListener.setSession(session);
        //设置订阅topic
        redisMessageListenerContainer.addMessageListener(
                subscribeListener, new ChannelTopic(TOPIC_PREFIX + username));
        this.username = username;
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() throws IOException {
        //从set中删除
        webSocketSet.remove(this);
        //在线数减1
        subOnlineCount();
        redisMessageListenerContainer.removeMessageListener(subscribeListener);
        log.info("有一连接关闭！当前在线人数为{}", getOnlineCount());
        redisUtil.deleteHashByFields(MATCHING, this.username);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("来自客户端的消息:{}", message);
        JSONObject jsonObject = JSONObject.parseObject(message);
        redisUtil.publish(TOPIC_PREFIX + jsonObject.getString("playerUsername"), jsonObject);
//        //群发消息
//        for (WebSocketServer item : webSocketSet) {
//            try {
//                item.sendMessage(message);
//            } catch (IOException e) {
//                log.info("发送消息异常：msg = {}", e);
//                continue;
//            }
//        }
    }

    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.info("发生错误，{}", error);
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     *
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    /**
     * 获取在线总人数
     *
     * @param
     * @return int
     * @author weirx
     * @date: 2022/3/22
     */
    public int getOnlineCount() {
        return redisUtil.getObject(USER_COUNT) == null ? 0 : (int) redisUtil.getObject(USER_COUNT);
    }

    /**
     * 人数加1
     *
     * @param
     * @return void
     * @author weirx
     * @date: 2022/3/22
     */
    public void addOnlineCount() {
        redisUtil.setIncrement(USER_COUNT);
    }

    /**
     * 人数减1
     *
     * @param
     * @return void
     * @author weirx
     * @date: 2022/3/22
     */
    public void subOnlineCount() {
        redisUtil.setDecrement(USER_COUNT);
    }

}
