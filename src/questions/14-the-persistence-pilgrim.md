---
title: The Persistence Pilgrim
description: The Persistence Pilgrim challenges your understanding of data storage in OpenEHR systems!
level: 14
correctAnswer: 3
difficulty: "Intermediate"
---

## Context

### Introduction

Delve into the intricacies of how OpenEHR data is actually stored in systems.

### Question

Which statement best describes how data is typically stored in an OpenEHR system?

## Answers

- Data is stored in relational tables matching the structure of archetypes
- Each composition is stored as a single document in a NoSQL database
- Data is stored in a node + path + value format, preserving the hierarchical structure
- Archetypes themselves store the data values directly

## Explanation

In many OpenEHR implementations, data is typically stored in a node + path + value format. This approach preserves the hierarchical structure defined by archetypes and templates, while allowing for efficient storage and querying of the data.

## Hint

Think about a storage method that would allow for flexible querying while maintaining the structure defined by archetypes.
