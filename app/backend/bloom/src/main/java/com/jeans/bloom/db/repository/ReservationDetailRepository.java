package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.ReservationDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * LJA | 2022.05.04
 * @name ReservationDetailRepository
 * @des 예약관련 API 실행을 위한 JpaRepository
 */
@Repository
public interface ReservationDetailRepository extends JpaRepository<ReservationDetail, Integer> {

    /**
     * LJA | 2022.05.04
     * @name getUnableDate
     * @des item_id와 quantity를 입력받아 해당 아이템을 예약할 수 없는 날짜를 리턴
     */
    @Query(value =
            "SELECT "+
                    " rdt.reservation_date AS reservation_date " +
                    " FROM reservation_detail_t rdt " +
                    " WHERE rdt.item_id = ?1 " +
                    " AND reservation_date BETWEEN ?2 AND DATE_ADD(?2,INTERVAL 14 DAY) " +
                    " GROUP BY rdt.reservation_date" +
                    " HAVING SUM(rdt.quantity) +?3 > (SELECT i.total_quantity from item_t i where i.item_id = ?1)"
            , nativeQuery = true
    )
    List<Date> getUnableDate(int itemId, LocalDate localDate, int quantity);
}
