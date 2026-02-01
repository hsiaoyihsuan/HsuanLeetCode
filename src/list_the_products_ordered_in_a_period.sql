-- 1327. List the Products Ordered in a Period
SELECT product_name, unit
FROM Products p1
INNER JOIN (
  SELECT product_id, SUM(unit) AS unit
  FROM Orders
  WHERE order_date >= '2020-02-01' AND order_date < '2020-03-01'
  GROUP BY product_id HAVING SUM(unit) >= 100
) p2
USING (product_id);
