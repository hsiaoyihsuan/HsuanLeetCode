-- 1070. Product Sales Analysis III
SELECT s1.product_id, s1.year AS first_year, s1.quantity, s1.price
FROM Sales s1
JOIN (
  SELECT product_id, Min(year) AS min_year
  FROM Sales
  GROUP BY product_id
) s2
ON s1.product_id = s2.product_id AND s1.year = s2.min_year;
