-- 550. Game Play Analysis IV
SELECT ROUND(
    COUNT(a1.player_id) / (SELECT COUNT(DISTINCT(player_id)) FROM Activity),
    2
  ) AS fraction
FROM Activity a1
JOIN (
  SELECT player_id, MIN(event_date) AS min_date
  FROM Activity
  GROUP BY player_id
) a2
ON
  a1.player_id = a2.player_id AND
  DATEDIFF(a1.event_date, a2.min_date) = 1
