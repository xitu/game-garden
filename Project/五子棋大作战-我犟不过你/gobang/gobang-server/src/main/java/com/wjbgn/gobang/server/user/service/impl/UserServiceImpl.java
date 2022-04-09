package com.wjbgn.gobang.server.user.service.impl;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wjbgn.gobang.server.user.entity.UserDO;
import com.wjbgn.gobang.server.user.entity.UserIntegralDO;
import com.wjbgn.gobang.server.user.mapper.UserMapper;
import com.wjbgn.gobang.server.user.service.UserIntegralService;
import com.wjbgn.gobang.server.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Description:
 * Create Date: 2022-03-29T11:34:09.441
 *
 * @author wjbgn
 * @version 1.0
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, UserDO> implements UserService {

    @Autowired
    private UserIntegralService userIntegralService;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean register(UserDO dtoToDo) {
        this.save(dtoToDo);
        //生成用户积分记录
        List<UserIntegralDO> userIntegralDOS = new ArrayList<>();
        userIntegralDOS.add(new UserIntegralDO(dtoToDo.getUsername(), 0, "manMachine", LocalDateTimeUtil.now()));
        userIntegralDOS.add(new UserIntegralDO(dtoToDo.getUsername(), 0, "online", LocalDateTimeUtil.now()));
        userIntegralService.saveBatch(userIntegralDOS);
        return true;
    }
}