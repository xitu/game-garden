package com.wjbgn.gobang.server.user.mapper;

import com.wjbgn.gobang.server.user.entity.UserDO;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * Description: 
 * Create Date: 2022-03-29T11:34:09.441
 * @author wjbgn
 * @version 1.0
 */
@Mapper
public interface UserMapper extends BaseMapper<UserDO> {
}