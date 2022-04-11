package com.wjbgn.gobang.server.user.convert;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wjbgn.gobang.server.user.dto.UserDTO;
import com.wjbgn.gobang.server.user.entity.UserDO;
import com.wjbgn.gobang.server.utils.BeanCopierUtil;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Description:
 * Create Date: 2022-03-29T11:34:09.441
 *
 * @author wjbgn
 * @version 1.0
 */
@Component
public class UserDoConvert {

    /**
     * DtoToDo
     *
     * @param userDTO
     * @return
     */
    public static UserDO dtoToDo(UserDTO userDTO) {
        UserDO userDO = new UserDO();
        BeanCopierUtil.copy(userDTO, userDO);
        return userDO;
    }

    /**
     * DoToDto
     *
     * @param userDO
     * @return
     */
    public static UserDTO doToDto(UserDO userDO) {
        UserDTO userDTO = new UserDTO();
        BeanCopierUtil.copy(userDO, userDTO);
        return userDTO;
    }

    /**
     * Page<DO> to Page<DTO>
     *
     * @param pageDO
     * @return
     */
    public static Page<UserDTO> pageConvert(Page<UserDO> pageDO) {
        List<UserDTO> list = listConvert(pageDO.getRecords());
        Page<UserDTO> page = new Page<>(pageDO.getCurrent(), pageDO.getSize(), pageDO.getTotal());
        page.setRecords(list);
        return page;
    }

    /**
     * list<DO> to list<DTO>
     *
     * @param listDO
     * @return
     */
    public static List<UserDTO> listConvert(List<UserDO> listDO) {
        List<UserDTO> list = new ArrayList<>();
        UserDTO userDTO;
        for (UserDO userDO : listDO) {
            userDTO = new UserDTO();
            BeanCopierUtil.copy(userDO, userDTO);
            list.add(userDTO);
        }
        return list;
    }
}