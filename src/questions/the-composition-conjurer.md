---
title: The Composition Conjurer
description: You've made it to the Composition Conjurer's lair! Your task is to craft a composition that will impress the Conjurer.
level: 19
correctAnswer: 1
---

## Context

### Introduction

Put your knowledge of OpenEHR compositions to the test by crafting a specific clinical record.

### Question

Create a composition for a patient's body temperature. The archetype ID is 'openEHR-EHR-OBSERVATION.body_temperature.v2'. The temperature is 37.5°C.

## Answers

- 1.
```json
{
  "composition": {
    "content": [
      {
        "observation": {
          "archetype_id": "openEHR-EHR-OBSERVATION.body_temperature.v2",
          "data": {
            "events": [
              {
                "data": {
                  "items": [
                    {
                      "value": {
                        "magnitude": 37.5,
                        "units": "°C"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }
}
```
- 2.
```json
{
  "patient": {
    "vitals": {
      "temperature": 37.5,
      "unit": "celsius"
    }
  }
}
```
- 3.
```json
{
  "openEHR": {
    "body_temperature": {
      "value": 37.5,
      "unit": "C"
    }
  }
}
```
- 4.
```json
{
  "composition": {
    "archetype": "openEHR-EHR-OBSERVATION.body_temperature.v2",
    "temperature": "37.5°C"
  }
}
```

## Explanation

The correct composition follows the OpenEHR structure, including the proper archetype ID, and nests the temperature value within the expected data structure.

## Hint

Consider the hierarchical structure of OpenEHR compositions and how data is typically represented.
