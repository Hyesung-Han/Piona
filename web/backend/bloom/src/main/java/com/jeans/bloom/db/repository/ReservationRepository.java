package com.jeans.bloom.db.repository;

import com.jeans.bloom.api.response.SaleRes;
import com.jeans.bloom.db.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.05.08
 * @name ReservationRepository
 * @des Reservation 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Optional<List<Reservation>> findReservationsByShop_ShopNumber(String shopNumber) throws Exception;

    /**
     * LJA | 2022.05.08
     * @name getTotalSale
     * @des shop_number를 사용해 매출 현황을 가져오는 메소드
     */
    @Query(value =
            "SELECT a.reservation_date, a.item_id, a.total_quantity, a.total_price, b.price, b.name " +
                    " FROM " +
                    "(SELECT "+
                    " DATE_FORMAT(rdt.reservation_date, '%Y-%m-%d') AS reservation_date, rdt.item_id AS item_id, SUM(rdt.quantity) AS total_quantity, SUM(rt.total_price) AS total_price" +
                    " FROM reservation_t rt " +
                    " INNER JOIN reservation_detail_t rdt " +
                    " ON rt.reservation_id = rdt.reservation_id " +
                    " WHERE rt.shop_number = ?1 " +
                    " AND rdt.reservation_date BETWEEN ?2 AND ?3" +
                    " GROUP BY DATE_FORMAT(rdt.reservation_date, '%Y-%m-%d'), rdt.item_id) a " +
                    "INNER JOIN (SELECT item_id, price, name from item_t) b " +
                    " on a.item_id = b.item_id "
            , nativeQuery = true
    )
    List<Object[]> getTotalSale(String shopNumber, LocalDate startDate, LocalDate EndDate);

}
