---
title: The Template Tavern
description: Welcome to The Template Tavern! Your first quest is to decipher a mysterious web template. Choose the correct interpretation to proceed. Caution! Quests will increase in difficulty as you progress.
level: 1
correctAnswer: 3
difficulty: "Beginner"
---

## Context

### Introduction

Welcome to the world of OpenEHR! In this challenge, you'll encounter your first OpenEHR template. Understanding these templates is crucial for working with health data in OpenEHR systems.

### Question

You encounter a web template with the following structure:

```xml
<composition>
  <content>
    <observation archetype_id='openEHR-EHR-OBSERVATION.blood_pressure.v1'>
      <data>
        <events xsi:type='POINT_EVENT'>
          <data>
            <items id='at0004'>
              <value xsi:type='DV_QUANTITY'>
                <magnitude>120</magnitude>
                <units>mm[Hg]</units>
              </value>
            </items>
          </data>
        </events>
      </data>
    </observation>
  </content>
</composition>
```

What does this template represent?

## Answers

- It's a recipe for a health potion
- It's a map to the hidden treasure of OpenEHR
- It's a blood pressure measurement of 120 mm[Hg]
- It's the secret code to unlock the next dungeon

## Explanation

This template represents a blood pressure measurement. The 'observation' element with the archetype ID 'openEHR-EHR-OBSERVATION.blood_pressure.v1' indicates it's for blood pressure, and the value 120 mm[Hg] is clearly visible in the structure.

## Hint

Look for the archetype ID and the value within the structure. The archetype ID often gives a clue about the type of data being recorded.
