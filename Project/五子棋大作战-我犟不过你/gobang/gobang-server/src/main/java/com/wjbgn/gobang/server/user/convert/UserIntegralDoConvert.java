package com.wjbgn.gobang.server.user.convert;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wjbgn.gobang.server.user.dto.UserIntegralDTO;
import com.wjbgn.gobang.server.user.entity.UserIntegralDO;
import com.wjbgn.gobang.server.utils.BeanCopierUtil;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Description: 
 * Create Date: 2022-04-07T10:29:18.521
 * @author wjbgn
 * @version 1.0
 */
@Component
public class UserIntegralDoConvert {

    /**
     * DtoToDo
     *
     * @param userIntegralDTO
     * @return
     */
    public static UserIntegralDO dtoToDo(UserIntegralDTO userIntegralDTO) {
            UserIntegralDO userIntegralDO = new UserIntegralDO();
        BeanCopierUtil.copy(userIntegralDTO, userIntegralDO);
        return userIntegralDO;
    }

    /**
     * DoToDto
     *
     * @param userIntegralDO
     * @return
     */
    public static UserIntegralDTO doToDto(UserIntegralDO userIntegralDO) {
            UserIntegralDTO userIntegralDTO = new UserIntegralDTO();
        BeanCopierUtil.copy(userIntegralDO, userIntegralDTO);
        return userIntegralDTO;
    }

    /**
     * Page<DO> to Page<DTO>
     *
     * @param pageDO
     * @return
     */
    public static Page<UserIntegralDTO> pageConvert(Page<UserIntegralDO> pageDO) {
        List<UserIntegralDTO> list = listConvert(pageDO.getRecords());
        Page<UserIntegralDTO> page = new Page<>(pageDO.getCurrent(), pageDO.getSize(), pageDO.getTotal());
        page.setRecords(list);
        return page;
    }

    /**
     * list<DO> to list<DTO>
     *
     * @param listDO
     * @return
     */
    public static List<UserIntegralDTO> listConvert(List<UserIntegralDO> listDO) {
        List<UserIntegralDTO> list = new ArrayList<>();
            UserIntegralDTO userIntegralDTO;
        for (UserIntegralDO userIntegralDO : listDO) {
                userIntegralDTO = new UserIntegralDTO();
            BeanCopierUtil.copy(userIntegralDO, userIntegralDTO);
            list.add(userIntegralDTO);
        }
        return list;
    }
}