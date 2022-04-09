package com.wjbgn.gobang.server.user.controller;


import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.crypto.digest.MD5;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wjbgn.gobang.server.user.convert.UserDoConvert;
import com.wjbgn.gobang.server.user.dto.UserDTO;
import com.wjbgn.gobang.server.user.entity.UserDO;
import com.wjbgn.gobang.server.user.service.UserService;
import com.wjbgn.gobang.server.utils.JwtUtil;
import com.wjbgn.gobang.server.utils.RedisUtil;
import com.wjbgn.gobang.server.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

/**
 * description: 登录controller
 *
 * @author: weirx
 * @time: 2021/3/29 9:36
 */
@Slf4j
@RestController
@RequestMapping("/gobang/user")
public class LoginController {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserService userService;

    /**
     * 登录
     *
     * @param userDTO
     * @return com.wjbgn.bsolver.gateway.util.dto.Result
     * @author weirx
     * @date: 2022/3/14
     */
    @PostMapping("/login")
    public Result login(@RequestBody UserDTO userDTO, @RequestHeader HttpHeaders headers) {
        if (ObjectUtil.isEmpty(userDTO.getUsername()) || ObjectUtil.isEmpty(userDTO.getPassword())) {
            return Result.failed("账号或密码不能为空！");
        }
        // 密码md5加密
        userDTO.setPassword(MD5.create().digestHex(userDTO.getPassword()));
        // 验证用户账号密码是否正确
        List<UserDO> list = userService.list(new QueryWrapper<>(UserDoConvert.dtoToDo(userDTO)));
        if (CollectionUtil.isEmpty(list)) {
            return Result.failed("账号或密码错误，登陆失败");
        }
        String token = JwtUtil.generateToken(userDTO.getUsername());
        // 将token放入redis
        redisUtil.setObjectExpire(JwtUtil.REDIS_TOKEN_PREFIX + userDTO.getUsername(), token, Duration.ofMinutes(JwtUtil.REDIS_TOKEN_EXPIRE_MINUTE));
        return Result.success("登陆成功", new UserDTO(userDTO.getUsername(), token));
    }

    /**
     * 登出接口
     *
     * @param
     * @return com.wjbgn.bsolver.gateway.util.dto.Result
     * @author weirx
     * @date: 2022/3/14
     */
    @PostMapping("/logout")
    public Result<String> logout(@RequestBody UserDTO userDTO) {
        Boolean b = redisUtil.deleteObject(JwtUtil.REDIS_TOKEN_PREFIX + userDTO.getUsername());
        if (!b) {
            return Result.failed("登出失败");
        }
        return Result.success("登出成功");
    }
}