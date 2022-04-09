package com.wjbgn.gobang.server.online.controller;

import com.wjbgn.gobang.server.online.service.IOnlineService;
import com.wjbgn.gobang.server.utils.Result;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Description:
 * Create Date: 2022-03-29T11:34:09.441
 *
 * @author wjbgn
 * @version 1.0
 */
@Api(tags = "")
@RestController
@RequestMapping("/gobang/online")
@AllArgsConstructor
public class OnlineController {

    @Autowired
    private IOnlineService onlineService;

    @PostMapping("/matching")
    public Result matching(@RequestBody Map<String, Object> map) {

        return onlineService.matching(map);

    }

}