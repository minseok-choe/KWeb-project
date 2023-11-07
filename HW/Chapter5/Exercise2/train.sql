-- 1. ID가 11인 노선을 예매한 모든 승객의 ID(id), 이름(name), 좌석 번호(seat_number)를 좌석 번호의 오름차순 으로 조회
SELECT `users`.`id`, `users`.`name`, `tickets`.`seat_number`
FROM `tickets`
         INNER JOIN `users` on `tickets`.`user` = `users`.`id` AND `tickets`.`train` = 11
ORDER BY `tickets`.`seat_number` ASC

--2. 각 사용자의 ID(id), 이름(name), 탑승 열차 수(trains_count), 총 거리(total_distance)를 총 거리의 내림 차순으로 상위 6명만 조회
SELECT u.id, u.name, COUNT(DISTINCT t.train) AS trains_count, SUM(tr.distance) AS total_distance
FROM users u
         JOIN tickets t ON u.id = t.user
         JOIN trains tr ON t.train = tr.id
GROUP BY u.id
ORDER BY total_distance DESC
    LIMIT 6;

--3
SELECT tr.id, ty.name AS type, ss.name AS src_stn, ds.name AS dst_stn,
       Timediff(tr.arrival, tr.departure) AS travel_time
FROM trains tr
         JOIN types ty ON tr.type = ty.id
         JOIN stations ss ON tr.source = ss.id
         JOIN stations ds ON tr.destination = ds.id
ORDER BY travel_time DESC
    LIMIT 6;

--4
SELECT ty.name AS type, ss.name AS src_stn, ds.name AS dst_stn,
       tr.departure, tr.arrival,
       ROUND(ty.fare_rate * (tr.distance / 1000), -2) AS fare
FROM trains tr
         JOIN types ty ON tr.type = ty.id
         JOIN stations ss ON tr.source = ss.id
         JOIN stations ds ON tr.destination = ds.id
ORDER BY tr.departure;


--5
SELECT tr.id, ty.name AS type, ss.name AS src_stn, ds.name AS dst_stn,
       COUNT(t.id) AS occupied, ty.max_seats
FROM trains tr
         JOIN types ty ON tr.type = ty.id
         JOIN stations ss ON tr.source = ss.id
         JOIN stations ds ON tr.destination = ds.id
         LEFT JOIN tickets t ON tr.id = t.train
GROUP BY tr.id
HAVING occupied > 0
ORDER BY tr.id;

--6
SELECT tr.id, ty.name AS type, ss.name AS src_stn, ds.name AS dst_stn,
       COUNT(t.user) AS occupied, ty.max_seats
FROM trains tr
         JOIN types ty ON tr.type = ty.id
         JOIN stations ss ON tr.source = ss.id
         JOIN stations ds ON tr.destination = ds.id
         LEFT JOIN tickets t ON tr.id = t.train
GROUP BY tr.id
ORDER BY tr.id;
