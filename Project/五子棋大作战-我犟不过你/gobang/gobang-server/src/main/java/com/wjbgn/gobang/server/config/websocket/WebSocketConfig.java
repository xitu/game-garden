package com.wjbgn.gobang.server.config.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @description： websocket配置类
 * @author：weirx
 * @date：2021/3/22 14:11
 * @version：3.0
 */
@Configuration
public class WebSocketConfig {

    /**
     * description: 这个配置类的作用是要注入ServerEndpointExporter，
     * 这个bean会自动注册使用了@ServerEndpoint注解声明的Websocket endpoint。
     * 如果是使用独立的servlet容器，而不是直接使用springboot的内置容器，
     * 就不要注入ServerEndpointExporter，因为它将由容器自己提供和管理。
     *
     * @return: org.springframework.web.socket.server.standard.ServerEndpointExporter
     * @author: weirx
     * @time: 2021/3/22 14:12
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }
}
