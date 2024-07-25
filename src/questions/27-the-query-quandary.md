---
title: The Query Quandary
description: The Query Quandary tests your ability to construct complex AQL queries for real-world scenarios!
level: 27
correctAnswer: 2
difficulty: "Expert"
---

## Context

### Question

Which AQL query would correctly retrieve the latest blood pressure readings for all patients diagnosed with hypertension in the last year?

### Outro

If you want to learn more about AQL, check out the <a href="https://specifications.openehr.org/releases/QUERY/latest/AQL.html" target="_blank">official documentation</a>.

## Answers

* 1.

```sql
SELECT e/ehr_id/value,
       o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude AS systolic,
       o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude AS diastolic
FROM EHR e
CONTAINS COMPOSITION c
CONTAINS OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1]
WHERE c/context/start_time > current_date - P1Y
ORDER BY c/context/start_time DESC
```

* 2.

```sql
SELECT e/ehr_id/value as ehr_id,
       p/data[at0001]/items[at0002]/value AS diagnosis,
       o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value AS systolic,
       o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value AS diastolic
FROM EHR e
CONTAINS COMPOSITION c
CONTAINS (OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1] and
          EVALUATION p[openEHR-EHR-EVALUATION.problem_diagnosis.v1])
WHERE c/context/start_time > current_date - P1Y
  AND p/data[at0001]/items[at0002]/value/defining_code/code_string = 'I10'
ORDER BY c/context/start_time DESC
```

* 3.

```sql
SELECT * FROM EHR
WHERE diagnosis = 'hypertension'
  AND diagnosis_date > current_date - 365
ORDER BY observation_date DESC
LIMIT 1
```

* 4.

```sql
GET latest_blood_pressure
FROM patients
WHERE diagnosis = 'hypertension'
  AND diagnosis_date > now() - interval '1 year'
```

## Explanation

This AQL query correctly addresses all aspects of the requirement. It retrieves the EHR ID, diagnosis, and blood pressure readings (systolic and diastolic). It combines the blood pressure OBSERVATION with the problem_diagnosis EVALUATION to filter for hypertension. The query filters for compositions from the last year, specifically selects for hypertension diagnosis (using the ICD-10 code 'I10' for essential hypertension), and orders the results by date to get the latest readings. This demonstrates the need to often combine different archetypes (in this case, observations and evaluations) to get clinically meaningful results in real-world scenarios.

## Hint

Consider how you would need to combine blood pressure readings with diagnosis information, and how to filter for both the time range and the specific diagnosis.
