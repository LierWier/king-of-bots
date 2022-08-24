package com.kob.backend.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;

    @GetMapping("/all")
    public List<User> getAll() {
        return userMapper.selectList(null);
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable int userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", userId);
        return userMapper.selectOne(queryWrapper);
    }

    @GetMapping("/add/{userId}/{username}/{password}/")
    public String addUser(
            @PathVariable int userId,
            @PathVariable String username,
            @PathVariable String password
    ) {
        String photo_temp_src = "https://cdn.acwing.com/media/user/profile/photo/179422_lg_882fa3c4ab.jpg";
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(userId, username, encodedPassword, photo_temp_src, 1500);
        userMapper.insert(user);
        return "Add User Successfully";
    }

    @GetMapping("/del/{userId}/")
    public String deleteUser(@PathVariable int userId) {
        userMapper.deleteById(userId);
        return "Delete User Successfully";
    }


}
