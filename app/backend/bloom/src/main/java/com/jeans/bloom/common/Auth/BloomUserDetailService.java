package com.jeans.bloom.common.Auth;

import com.jeans.bloom.api.service.UserService;
import com.jeans.bloom.db.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

public class BloomUserDetailService implements UserDetailsService{
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUserId(username);
        if(user != null) {
            BloomUserDetails userDetails = new BloomUserDetails(user);
            return (UserDetails) userDetails;
        }
        return null;
    }
}
