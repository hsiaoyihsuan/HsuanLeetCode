-- 1527. Patients With a Condition
SELECT * FROM Patients
WHERE conditions REGEXP '(^| )DIAB1';
