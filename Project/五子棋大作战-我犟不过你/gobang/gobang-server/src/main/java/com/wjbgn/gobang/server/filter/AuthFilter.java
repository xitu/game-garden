package com.wjbgn.gobang.server.filter;


import cn.hutool.core.util.ObjectUtil;
import com.wjbgn.gobang.server.enums.CommonReturnEnum;
import com.wjbgn.gobang.server.utils.JwtUtil;
import com.wjbgn.gobang.server.utils.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 权限验证过滤器
 *
 * @author weirx
 * @date 2022/03/14 10:25
 **/
@Slf4j
@Component
public class AuthFilter implements Filter {

    @Autowired
    private RedisUtil redisUtil;

    @Value("#{'${filter.white-list}'.split(',')}")
    private List<String> whiteList;


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        try {
            String path = request.getRequestURI();
            //白名单，放行
            for (String url : whiteList) {
                if (path.contains(url)) {
                    filterChain.doFilter(request, response);
                    return;
                }
            }
            String token = request.getHeader("AUTHORIZATION");
            log.info("AUTHORIZATION: {}", token);
            log.info("_username: {}", request.getHeader("_username"));
            String username = URLDecoder.decode(request.getHeader("_username"), "UTF-8");


            //token为空
            if (StringUtils.isEmpty(token) || "null".equals(token)) {
                response.sendError(CommonReturnEnum.UNAUTHORIZED.getCode(), CommonReturnEnum.UNAUTHORIZED.getName());
                return;
            }
            //验证token
            String tokenCache = redisUtil.getString(JwtUtil.REDIS_TOKEN_PREFIX + username);
            if (StringUtils.isEmpty(tokenCache)) {
                Map<String, String> stringStringMap = JwtUtil.validateToken(token);
                if (ObjectUtil.isEmpty(stringStringMap)) {
                    response.sendError(CommonReturnEnum.UNAUTHORIZED.getCode(), CommonReturnEnum.UNAUTHORIZED.getName());
                    return;
                }
            }
            //没过期，对比当前token和缓存的token是否一致
            if (!token.equals(tokenCache)) {
                boolean tokenAndUser = JwtUtil.validateTokenAndUser(token, username);
                if (!tokenAndUser) {
                    response.sendError(CommonReturnEnum.UNAUTHORIZED.getCode(), CommonReturnEnum.UNAUTHORIZED.getName());
                    return;
                }
            }
            //token验证通过，token续期
            String refreshToken = JwtUtil.refreshToken(token, username);
            redisUtil.setObjectExpire(JwtUtil.REDIS_TOKEN_PREFIX + username, refreshToken,
                    JwtUtil.REDIS_TOKEN_EXPIRE_MINUTE, TimeUnit.MINUTES);

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.info("[AuthFilter.doFilter] exception: {}", e);
        }
    }
}
