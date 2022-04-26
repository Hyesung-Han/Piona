package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
//    User save(User user);
}
