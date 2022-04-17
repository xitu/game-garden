package com.wjbgn.gobang.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

//@ServletComponentScan
@EnableScheduling
@MapperScan("com.wjbgn.gobang.server.user.mapper")
@SpringBootApplication
public class GobangServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GobangServerApplication.class, args);
    }

}

