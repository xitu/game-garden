package com.wjbgn.gobang.server.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wjbgn.gobang.server.user.entity.UserIntegralDO;
import com.wjbgn.gobang.server.user.mapper.UserIntegralMapper;
import com.wjbgn.gobang.server.user.service.UserIntegralService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.locks.ReentrantLock;

/**
 * Description:
 * Create Date: 2022-04-07T10:29:18.521
 *
 * @author wjbgn
 * @version 1.0
 */
@Service
public class UserIntegralServiceImpl extends ServiceImpl<UserIntegralMapper, UserIntegralDO> implements UserIntegralService {

    private ReentrantLock lock = new ReentrantLock();

    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean updateIntegral(UserIntegralDO userIntegralDO) {

        lock.lock();
        try {
            UserIntegralDO userIntegral = new UserIntegralDO(userIntegralDO.getUsername(), userIntegralDO.getType());
            // 获取当前用户的积分
            UserIntegralDO one = this.getOne(new QueryWrapper<>(userIntegral));

            if (one.getIntegral() == 0 && userIntegralDO.getIntegral() < 0) {
                return true;
            } else if ((one.getIntegral() > 0 && one.getIntegral() < 10) && userIntegralDO.getIntegral() < 0) {
                this.lambdaUpdate().getBaseMapper().update(
                        new UserIntegralDO(0),
                        new QueryWrapper<>(userIntegral));
            } else {
                this.lambdaUpdate().getBaseMapper().update(
                        new UserIntegralDO(one.getIntegral() + userIntegralDO.getIntegral()),
                        new QueryWrapper<>(userIntegral));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
        return true;
    }
}