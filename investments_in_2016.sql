-- 585. Investments in 2016
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance t1
JOIN (
  SELECT pid FROM Insurance
  GROUP BY lat, lon HAVING COUNT(pid) = 1
) t2 USING(pid)
JOIN (
  SELECT tiv_2015 FROM Insurance
  GROUP BY tiv_2015 HAVING COUNT(tiv_2015) > 1
) t3 USING(tiv_2015);
