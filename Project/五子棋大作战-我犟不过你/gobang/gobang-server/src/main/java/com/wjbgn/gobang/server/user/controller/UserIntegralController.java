package com.wjbgn.gobang.server.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wjbgn.gobang.server.user.convert.UserIntegralDoConvert;
import com.wjbgn.gobang.server.user.entity.UserIntegralDO;
import com.wjbgn.gobang.server.user.dto.UserIntegralDTO;
import com.wjbgn.gobang.server.user.service.UserIntegralService;
import com.wjbgn.gobang.server.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Description: 
 * Create Date: 2022-04-07T10:29:18.521
 * @author wjbgn
 * @version 1.0
 */
@Api(tags = "")
@RestController
@RequestMapping("/gobang/integral")
@AllArgsConstructor
public class UserIntegralController {

    /**
     * UserIntegralService
     */
    private UserIntegralService userIntegralService;

    /**
     * 分页列表
     * @param userIntegralDTO
     * @return
     */
    @ApiOperation(value = "分页列表")
    @PostMapping("/pageList")
    public Result pageList(@RequestBody UserIntegralDTO userIntegralDTO) {
        QueryWrapper<UserIntegralDO> queryWrapper = new QueryWrapper<>(UserIntegralDoConvert.dtoToDo(userIntegralDTO));
        Page<UserIntegralDO> page = new Page<>(userIntegralDTO.getPage(), userIntegralDTO.getLimit());
        Page<UserIntegralDO> pageList = userIntegralService.page(page, queryWrapper.orderByDesc("integral"));
        return Result.success(UserIntegralDoConvert.pageConvert(pageList));
    }

    /**
     * 更新
     * @param userIntegralDTO
     * @return
     */
    @ApiOperation(value = "更新积分")
    @PostMapping("/updateIntegral")
    public Result update(@RequestBody UserIntegralDTO userIntegralDTO) {
        boolean flag = userIntegralService.updateIntegral(UserIntegralDoConvert.dtoToDo(userIntegralDTO));
        if (flag) {
            return Result.success();
        }
        return Result.failed();
    }
}