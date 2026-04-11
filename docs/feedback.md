# Documentation for feedback.json

This document explains how the .github/autograder/feedback.json file works, how it is used in the flow, and how to adjust the student feedback strategy.

## Purpose

feedback.json controls how the automated evaluation result is presented.

In other words:

- `criteria.json` decides what is evaluated.
- `feedback.json` decides how the result is shown.

## Where it is in the project

Target file:

- .github/autograder/feedback.json

Current content:

```json
{
  "general": {
    "show_score": true,
    "show_passed_tests": false,
    "add_report_summary": true
  },
  "default": {}
}
```

## File structure

### general

Block with global presentation options.

#### show_score

- Current value: `true`
- Effect: displays the final score in the feedback.
- Use: important to provide objective visibility of performance.

#### show_passed_tests

- Current value: `false`
- Effect: does not list passed tests.
- Use: reduces noise, focusing on what needs correction.

#### add_report_summary

- Current value: `true`
- Effect: adds an overall report summary.
- Use: makes quick reading of the final result easier.

### default

- Current value: empty object `{}`
- Role: space for `default` feedback type configurations.
- Even empty, the block maintains structural consistency.

## How this file is used in the flow

1. The workflow in `.github/workflows/classroom.yml` runs the autograder.
2. The autograder runs the tests defined in `criteria.json`.
3. When building final output, the autograder applies rules from `feedback.json`.
4. The student receives feedback with the display policy defined in `general`.

## Common pedagogical strategies

### Scenario 1: improvement focus

Suggested configuration:

- show_score: true
- show_passed_tests: false
- add_report_summary: true

Reason: shows the grade, avoids clutter with approvals, and highlights what still needs adjustment.

### Scenario 2: class onboarding

Possible configuration:

- show_passed_tests: true

Reason: beginner students better understand what has already been achieved.

### Scenario 3: more objective evaluation

Possible configuration:

- keep show_passed_tests: false
- keep show_score: true

Reason: lean feedback focused on gaps.

## Relationship with other files

- `criteria.json`: defines tests and weights.
- `classroom.yml`: runs the pipeline that generates and publishes this feedback.
