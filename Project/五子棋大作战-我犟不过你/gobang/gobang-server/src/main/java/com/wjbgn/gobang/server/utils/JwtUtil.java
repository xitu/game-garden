package com.wjbgn.gobang.server.utils;

import cn.hutool.core.date.DateUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * description: jwt工具类
 *
 * @author: weirx
 * @time: 2021/3/26 10:44
 */
@Slf4j
public class JwtUtil {

    /**
     * jwt的secret
     */
    public static final String SECRET = "3290842582jwruwo09482038j3hohg24j03j4r3g3439jtgho1231231qqqqwwqasdwe";

    /**
     * token前缀
     */
    public static final String TOKEN_PREFIX = "JWT ";

    /**
     * header中的username存储的key
     */
    public static final String HEADER_USERNAME = "_username";

    /**
     * header中的token存储的key
     */
    public static final String HEADER_AUTH = "AUTHORIZATION";

    /**
     * description: token超时时间，默认30分钟
     *
     * @return:
     * @author: weirx
     * @time: 2021/3/26 14:37
     */
    public static final int TOKEN_EXPIRATION_MINUTE = 60 * 6;

    /**
     * redis token前缀
     */
    public static final String REDIS_TOKEN_PREFIX = "TOKEN:";

    /**
     * redis token保存时间
     */
    public static final Integer REDIS_TOKEN_EXPIRE_MINUTE = 60 * 6;

    /**
     * description: 生成token
     *
     * @param username
     * @return: java.lang.String
     * @author: weirx
     * @time: 2021/3/26 14:22
     */
    public static String generateToken(String username) {
        HashMap<String, Object> map = new HashMap<>(1);
        map.put(HEADER_USERNAME, username);
        String jwt = Jwts.builder()
                .setSubject(HEADER_USERNAME).setClaims(map)
                .setExpiration(DateUtil.offsetMinute(new Date(), TOKEN_EXPIRATION_MINUTE))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        return TOKEN_PREFIX + jwt;
    }

    /**
     * 验证token
     * @param token
     * @author weirx
     * @return java.util.Map<java.lang.String, java.lang.String>
     * @date: 2022/3/10
     */
    public static Map<String, String> validateToken(String token) {
        HashMap<String, String> tokenMap = new HashMap<String, String>(1);
        if (StringUtils.isEmpty(token)) {
            return tokenMap;
        }
        try {
            Map<String, Object> tokenBody = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();
            String username = String.valueOf(tokenBody.get(HEADER_USERNAME));
            tokenMap.put(HEADER_USERNAME, username);
        } catch (ExpiredJwtException e) {
            log.info("[JwtUtil.validateToken]: Token validation failed ");
            return null;
        }
        return tokenMap;
    }

    /**
     * 同时验证token和username是否是一个人
     * @param token
     * @param username
     * @author weirx
     * @return boolean
     * @date: 2022/3/10
     */
    public static boolean validateTokenAndUser(String token, String username) {
        Map<String, String> tokenResultMap;
        if (StringUtils.isEmpty(token) || StringUtils.isEmpty(username)) {
            return false;
        }
        tokenResultMap = validateToken(token);
        if (StringUtils.isEmpty(token) || StringUtils.isEmpty(username)) {
            return false;
        }
        if (tokenResultMap == null){
            return false;
        }
        //判断传入的username和token是否匹配
        String u = tokenResultMap.get(HEADER_USERNAME);
        if (!username.equals(u)) {
            return false;
        }
        return true;
    }

    /**
     * token续期，实际是生成一个新的token
     * @param token
     * @param username
     * @author weirx
     * @return java.lang.String
     * @date: 2022/3/10
     */
    public static String refreshToken(String token, String username) {
        boolean b = validateTokenAndUser(token, username);
        if (!b) {
            return null;
        } else {
            return generateToken(username);
        }
    }

    public static void main(String[] args) {
        Map<String, String> stringStringMap = validateToken("JWT eyJhbGciOiJIUqzUxMiJ9.eyJleHAiOjE2NDcyMjUzMTEsIl91c2VybmFtZSI6IndlaXJ4In0.SqlG1MuZucK2uKd0IywdlJ9weMd8ELjrMf0-Tow00ZuXDpkbS_UID7Ls_iT0fQ1cg5mvyxsVaDWetT8n181JRQ");

        System.out.println(stringStringMap);
    }
}