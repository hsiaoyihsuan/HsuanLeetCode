-- 185. Department Top Three Salaries
SELECT
  d.name AS Department,
  e.name AS Employee,
  e.salary AS Salary
FROM Employee e
JOIN (
  SELECT
    id,
    DENSE_RANK() OVER(
      PARTITION BY departmentId ORDER BY salary DESC
    ) AS salary_rank
  FROM Employee
) r ON e.id = r.id
JOIN Department d ON e.departmentId = d.id
WHERE r.salary_rank <= 3;
