package com.wjbgn.gobang.server.user.controller;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 用户注册控制器
 *
 * @author weirx
 * @date 2022/03/11 10:24
 **/
@Slf4j
@RestController
@RequestMapping("/gobang/user")
public class RegisterController {


    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     *
     * @param userDTO
     * @return com.wjbgn.bsolver.gateway.util.dto.Result
     * @author weirx
     * @date: 2022/3/11
     */
    @PostMapping("/register")
    public Result register(@RequestBody UserDTO userDTO) {
        if (ObjectUtil.isEmpty(userDTO.getUsername()) || ObjectUtil.isEmpty(userDTO.getPassword())) {
            return Result.failed("账号或密码不能为空！");
        }
        // 密码md5加密
        userDTO.setPassword(MD5.create().digestHex(userDTO.getPassword()));
        // 验证用户是否存在
        List<UserDO> list = userService.list(new QueryWrapper<>(new UserDO(userDTO.getUsername())));
        if (CollectionUtil.isNotEmpty(list)) {
            return Result.failed("账号已存在");
        }
        userDTO.setCreateTime(LocalDateTimeUtil.now());
        boolean save = userService.register(UserDoConvert.dtoToDo(userDTO));
        if (!save){
            return Result.failed("用户注册失败吗，请稍后尝试");
        }
        String token = JwtUtil.generateToken(userDTO.getUsername());
        redisUtil.setObjectExpire(JwtUtil.REDIS_TOKEN_PREFIX + userDTO.getUsername(), token, Duration.ofMinutes(JwtUtil.REDIS_TOKEN_EXPIRE_MINUTE));
        return Result.success("注册成功", new UserDTO(userDTO.getUsername(), token));

    }

}
