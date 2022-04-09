package com.wjbgn.gobang.server.user.service;

import com.wjbgn.gobang.server.user.entity.UserIntegralDO;
import com.baomidou.mybatisplus.extension.service.IService;
/**
 * Description: 
 * Create Date: 2022-04-07T10:29:18.521
 * @author wjbgn
 * @version 1.0
 */
public interface UserIntegralService extends IService<UserIntegralDO> {

    boolean updateIntegral(UserIntegralDO dtoToDo);
}