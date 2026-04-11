# Autograder for Web Projects

Demonstration of the Autograder to automatically evaluate student code with GitHub Actions and criteria-oriented feedback.

[Autograder WebTech](https://github.com/webtech-network/autograder) | [Criteria](docs/criteria.md) | [Feedback](docs/feedback.md) | [Workflow](docs/workflow-classroom.md)

---

## Table of Contents

- [Autograder for Web Projects](#autograder-for-web-projects)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [About the Project](#about-the-project)
  - [Repository Architecture](#repository-architecture)
  - [Evaluation Flow](#evaluation-flow)
  - [Detailed Documentation](#detailed-documentation)
  - [Practical Usage](#practical-usage)
    - [When you want to change what is evaluated](#when-you-want-to-change-what-is-evaluated)
    - [When you want to change how the result is shown](#when-you-want-to-change-how-the-result-is-shown)
    - [When you want to change when/how it runs](#when-you-want-to-change-whenhow-it-runs)
  - [Quick Troubleshooting](#quick-troubleshooting)
  - [Summary](#summary)

---

## Quick Start

1. Edit the student files in `submission/`.
2. Adjust criteria in `.github/autograder/criteria.json` when needed.
3. Configure feedback display in `.github/autograder/feedback.json`.
4. Push or open a PR to `main`.
5. Check the `Autograder` workflow execution in GitHub Actions.

> Important: test paths must follow the pattern `submission/file.ext`.

---

## About the Project

This repository is a demonstration of automated evaluation for web projects. The goal is to clearly separate:

- student-submitted code;
- evaluation rules;
- feedback policy;
- automated execution pipeline.

With this separation, you can evolve the rubric without directly modifying submission code.

## Repository Architecture

| Component                          | Function                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `submission/`                      | Files submitted by the student (`index.html`, `styles.css`, `app.js`, etc.) |
| `.github/autograder/criteria.json` | Defines weights, blocks, and evaluation tests                               |
| `.github/autograder/feedback.json` | Defines how the result will be displayed                                    |
| `.github/workflows/classroom.yml`  | Triggers and runs the autograder on GitHub Actions                          |
| `.github/autograder/setup.json`    | Additional setup file (not used in the current flow)                        |

---

## Evaluation Flow

1. A CI event happens (`push`, `pull_request`, or `workflow_dispatch`).
2. The workflow in `.github/workflows/classroom.yml` starts the `grading` job.
3. The `webtech-network/autograder@main` action runs the tests defined in `criteria.json`.
4. The final result is presented according to `feedback.json`.

> Attention: the workflow uses `openai-key: ${{ secrets.ENGINE }}`. Make sure this secret exists in the repository.

---

## Detailed Documentation

To go deeper into the configuration of each file:

- [docs/criteria.md](docs/criteria.md): rubric structure, weights, test types, and safe maintenance.
- [docs/feedback.md](docs/feedback.md): result display strategy and feedback configurations.
- [docs/workflow-classroom.md](docs/workflow-classroom.md): triggers, jobs, steps, and execution parameters.

## Practical Usage

### When you want to change what is evaluated

Edit `.github/autograder/criteria.json` and validate in a PR whether the tests represent the pedagogical objective.

### When you want to change how the result is shown

Edit `.github/autograder/feedback.json` (for example, to show or hide passed tests).

### When you want to change when/how it runs

Edit `.github/workflows/classroom.yml` to adjust triggers, permissions, or action parameters.

---

## Quick Troubleshooting

- Workflow did not generate feedback: confirm that the `ENGINE` secret is configured.
- Tests fail for no apparent reason: review paths in `criteria.json` for `submission/...`.
- Rule change was not reflected: verify that the executed workflow is the latest one from the branch.

---

## Summary

This repository exemplifies an ideal scenario for running the Autograder for web activities:

- `submission/` contains the submission;
- `criteria.json` defines the grading;
- `feedback.json` defines the presentation;
- `classroom.yml` runs everything in CI.

For day-to-day operation, use this README as a quick entry point and the files in `docs/` as in-depth reference.
