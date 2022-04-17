package com.wjbgn.gobang.server.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wjbgn.gobang.server.user.entity.UserDO;

/**
 * Description:
 * Create Date: 2022-03-29T11:34:09.441
 *
 * @author wjbgn
 * @version 1.0
 */
public interface UserService extends IService<UserDO> {
    boolean register(UserDO dtoToDo);
}