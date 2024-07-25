---
title: The Archetype Architect
description: The Archetype Architect tests your understanding of archetype design principles and best practices!
level: 22
correctAnswer: 4
difficulty: "Expert"
---

## Context

### Question

You need to design an archetype for recording a patient's smoking history. Which of the following approaches is most aligned with OpenEHR best practices?

## Answers

- Create a single, comprehensive archetype that covers all possible smoking-related data points
- Design multiple, highly specific archetypes for each aspect of smoking history
- Use an existing generic 'lifestyle factor' archetype and constrain it for smoking
- Create a moderate-sized archetype focusing on key smoking history elements, with the ability to extend or specialize later

## Explanation

The best approach is to create a moderate-sized archetype focusing on key smoking history elements, with the ability to extend or specialize later. This balances the need for specific smoking-related data capture with the OpenEHR principles of reusability and maintainability. It allows for future refinement without overcomplicating the initial design.

## Hint

Consider the balance between specificity and reusability in archetype design, as well as the potential for future extensions.
