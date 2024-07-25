---
title: The AQL Alchemist
description: Enter the laboratory of the AQL Alchemist, where queries are brewed to extract the essence of clinical data!
level: 20
correctAnswer: 1
difficulty: "Expert"
---

## Context

### Introduction

Welcome to the AQL Alchemist's challenge! Here, you'll test your knowledge of Archetype Query Language (AQL), the specialized query language used in OpenEHR systems.

### Question

Which AQL query will retrieve all blood pressure measurements for a specific patient with EHR ID 'abc123'?

## Answers

* 1.

```sql
SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude AS systolic,
       o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude AS diastolic
FROM EHR e
CONTAINS COMPOSITION c
CONTAINS OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1]
WHERE e/ehr_id/value='abc123'
```

* 2.

```sql
SELECT * FROM EHR WHERE patient_id = 'abc123' AND observation_type = 'blood_pressure'
```

* 3.

```sql
GET blood_pressure FROM patient WHERE id = 'abc123'
```

* 4.

```sql
FIND 'blood pressure' IN EHR 'abc123'
```

## Explanation

This AQL query correctly navigates the openEHR structure to retrieve systolic and diastolic blood pressure values from the specific archetype, filtering for the given EHR ID.

## Hint

AQL uses a structure similar to SQL, but with paths that navigate the openEHR data model.
