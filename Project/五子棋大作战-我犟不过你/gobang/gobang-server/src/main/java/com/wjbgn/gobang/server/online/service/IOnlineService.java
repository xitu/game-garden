package com.wjbgn.gobang.server.online.service;

import com.wjbgn.gobang.server.utils.Result;

import java.util.Map;

/**
 * 在线对战service
 *
 * @author weirx
 * @date 2022/04/05 11:30
 **/
public interface IOnlineService {

    Result matching(Map<String, Object> map);
}
