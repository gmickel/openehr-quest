---
title: The Versioning Virtuoso
description: The Versioning Virtuoso challenges your understanding of change management in OpenEHR systems!
level: 23
correctAnswer: 2
difficulty: "Expert"
---

## Context

### Question

A critical error is discovered in a widely-used medication archetype. What is the appropriate way to handle this in an OpenEHR system?

### Outro

Proper versioning and change management are essential for maintaining data integrity and system compatibility in OpenEHR implementations.

## Answers

* Immediately replace the archetype with a corrected version in all systems
* Create a new version of the archetype, deprecate the old one, and update systems gradually
* Leave the archetype as-is and instruct users to be aware of the error
* Create a completely new archetype with a different ID to replace the erroneous one

## Explanation

The appropriate approach is to create a new version of the archetype, deprecate the old one, and update systems gradually. This maintains backward compatibility for existing data while allowing systems to adopt the corrected version. It follows OpenEHR's principles of versioning and change management.

## Hint

Think about how to balance the need for correction with the reality of existing data and systems using the current version.
