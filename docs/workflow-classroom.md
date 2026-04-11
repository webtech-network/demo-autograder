# Documentation for classroom.yml

This document explains how the .github/workflows/classroom.yml file works, which triggers autograder execution in GitHub Actions.

## Purpose

classroom.yml defines when, where, and with which parameters the autograder runs.

Without this file, `criteria.json` and `feedback.json` would not be executed automatically in the pipeline.

## Where it is in the project

Target file:

- .github/workflows/classroom.yml

Current content (summary):

- Workflow named `Autograder`.
- Triggers on `push`, `pull_request`, and `workflow_dispatch`.
- `grading` job on `ubuntu-latest`.
- Checkout with path `submission`.
- Execution of the `webtech-network/autograder@main` action.

## Structure of the current workflow

## name

```yaml
name: Autograder
```

Name shown in the GitHub Actions tab.

## on

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:
```

Configured triggers:

- `push` to `main`: runs when commits are sent to the main branch.
- `pull_request` to `main`: runs to validate changes before merge.
- `workflow_dispatch`: allows manual execution in GitHub Actions.

## jobs.grading

```yaml
jobs:
  grading:
    permissions: write-all
    runs-on: ubuntu-latest
    if: github.actor != 'github-classroom[bot]'
```

### permissions: write-all

Allows writing artifacts/feedback in the workflow context.

### runs-on: ubuntu-latest

Default Linux environment for job execution.

### if: github.actor != 'github-classroom[bot]'

Prevents running when the actor is the Classroom bot, avoiding loops and unnecessary executions.

## steps

### 1) Checkout repository

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
  with:
    path: submission
```

Checks out the repository into a directory named `submission`.

Practical implication:

- The pipeline works with this checkout layout.
- Paths used in `criteria.json` must stay consistent with the project convention (`submission/file`).

### 2) Run Autograder

```yaml
- name: Run Autograder
  uses: webtech-network/autograder@main
  with:
    template-preset: "webdev"
    feedback-type: "default"
    include-feedback: "true"
    openai-key: ${{ secrets.ENGINE }}
```

Main fields:

- template-preset: webdev
  - Selects a test set for web projects.

- feedback-type: default or "ia"
  - Defines feedback mode, standard or AI.

- include-feedback: "true"
  - Ensures feedback output is included in execution.

- openai-key: secrets.ENGINE
  - Uses the `ENGINE` secret for AI feedback resources.

## How this file is used in the flow

1. A trigger occurs (`push`, PR, or manual).
2. GitHub Actions starts the `grading` job.
3. The repository is downloaded in the checkout step.
4. The autograder action runs the tests defined in `criteria.json`.
5. Output format follows `feedback.json`.
6. The result becomes available in the workflow execution in Actions.

## How to edit safely

1. Avoid changing multiple workflow blocks at once.
2. Test changes in a PR before applying to `main`.
3. If you rename a secret, update Settings > Secrets and variables > Actions.
4. If you change triggers, validate whether expected course behavior is preserved.

## Relationship with other files

- `criteria.json`: defines the rubric and tests.
- `feedback.json`: defines how to present the final result.
