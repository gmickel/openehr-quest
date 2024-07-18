---
title: The Semantic Sage
description: The Semantic Sage tests your ability to ensure semantic interoperability in OpenEHR implementations!
level: 24
correctAnswer: 3
---

## Context

### Question

You're integrating two OpenEHR systems that use different terminology bindings for medication names. What's the best approach to ensure semantic interoperability?

### Outro

Achieving semantic interoperability is crucial for meaningful data exchange between different healthcare systems.

## Answers

- Force one system to adopt the terminology bindings of the other
- Create a mapping table between the two terminologies and translate during data exchange
- Use OpenEHR's terminology binding features to map both to a common standard terminology
- Store medication names as free text to avoid terminology conflicts

## Explanation

The best approach is to use OpenEHR's terminology binding features to map both systems to a common standard terminology. This preserves the local terminologies while ensuring semantic interoperability through a shared standard. It leverages OpenEHR's design for handling diverse terminologies.

## Hint

Consider how OpenEHR is designed to handle terminology differences while maintaining semantic meaning across systems.
