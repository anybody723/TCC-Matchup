package com.matchup.repository;

import com.matchup.model.Contact;
import com.matchup.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findById(long id);

    Optional<List<Contact>> findContactsByUser1Id(long user1Id);

    boolean existsByUser1IdAndUser2Id(long user1Id, long user2Id);

}
