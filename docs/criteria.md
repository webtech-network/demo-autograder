# Documentation for criteria.json

This document explains how the .github/autograder/criteria.json file works, how it is used in the project, and how to edit criteria safely.

## Purpose

criteria.json defines:

- The test library used by the autograder.
- The evaluation hierarchy (groups, subgroups, and weights).
- Which tests will be executed for each submission file.
- Which parameters each test uses.

In this repository flow, this file is the source of truth for the technical score.

## Where it is in the project

Target file:

- .github/autograder/criteria.json

Evaluated submission files:

- submission/index.html
- submission/styles.css
- submission/app.js
- submission/README.md

## General file structure

The current file follows this conceptual format:

```json
{
  "test_library": "web_dev",
  "base": {
    "weight": 100,
    "subjects": [
      {
        "subject_name": "...",
        "weight": 50,
        "subjects": [
          {
            "subject_name": "...",
            "weight": 60,
            "tests": [
              {
                "file": "submission/index.html",
                "name": "has_tag",
                "parameters": [
                  { "name": "tag", "value": "header" },
                  { "name": "required_count", "value": 1 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Main fields

### test_library

- Current value: web_dev
- Defines the validator library available in the Autograder.
- The test names in the `name` field depend on this library.

### base

- It is the root of the evaluation.
- `weight` indicates the total evaluation weight (100).
- `subjects` contains high-level evaluation blocks.

### subject_name

- Name of the evaluated block.
- It is displayed in evaluation reports.

### weight

- Relative weight of that block at the current level.
- The higher the weight, the greater the impact on the final score.

### subjects

- Subdivisions of the current block.
- Lets you build a tree-structured rubric.

### tests

- List of executable validations.
- Each item maps file, test type, and parameters.

### file

- File targeted by the test.
- It can be a specific path (for example, `submission/index.html`) or `all` when the test analyzes the project as a whole.

### name

- Type of test to execute.
- Examples used in this project: `has_tag`, `has_style`, `js_uses_dom_manipulation`, `has_no_js_framework`.

### parameters

- Parameters that customize the test.
- Standard format: list of objects with `name` and `value`.

## Reading the current configuration

The evaluation is divided into 3 main blocks.

## 1) content_and_style (weight 50)

Focuses on HTML structure and CSS styles.

### html (weight 60 inside content_and_style)

Subblocks:

- layout_tags (weight 40): requires semantic tags such as `header`, `nav`, `main`, `article`, `footer`.
- basic_structure (weight 20): requires `body`, `head`, `title`.
- functional_elements (weight 20): requires `form`, `input`, `button`.
- link (weight 20): validates whether CSS is properly linked.

Test types used here:

- has_tag
- check_css_linked

### css (weight 40 inside content_and_style)

Subblocks:

- responsivity (weight 30): media queries and flexbox.
- style (weight 50): count of CSS properties (`font-size`, `font-family`, `text-align`, `display`, `position`, `margin`, `padding`, `width`).
- basic_selectors (weight 20): requires `class` and `id` attributes in HTML.

Test types used here:

- check_media_queries
- check_flexbox_usage
- has_style
- has_attribute

## 2) interactive_page (weight 30)

Focuses on dynamic JavaScript and framework-free integrity.

Subblocks:

- DOM_js (weight 70): requires DOM manipulation and query string parsing.
- linking_and_integrity (weight 30): validates the absence of JS frameworks.

Test types used:

- js_uses_dom_manipulation
- js_uses_query_string_parsing
- has_no_js_framework

## 3) best_pratices (weight 20)

Focuses on CSS best practices, project structure, and SEO.

Subblocks:

- css_best_pratices (weight 70): requires `container`, `form-container`, and `card` classes.
- project_structure (weight 30): checks required files in `submission`.
- SEO_best_pratices (weight 30): requires `author`, `description`, and `keywords` attributes.

Test types used:

- has_class
- check_project_structure
- has_attribute

Note: in the current file, some names are written as `pratices`. This does not prevent technical interpretation, but standardizing them to `practices` in the future is recommended.

## Important parameters and differences

### required_count x count

- `required_count` is used in several structure/occurrence tests (for example, `has_tag`, `has_class`, and in some cases `has_attribute`).
- `count` appears in `has_style` for expected quantity of a CSS property.

Replacing one with the other may cause the test to fail or be interpreted incorrectly.

### attribute x attribute_names

In the current file, both variants appear in `has_attribute`:

- `attribute` (for example, `class`, `id`)
- `attribute_names` (for example, `author`, `description`, `keywords`)

Before changing this, confirm actual autograder behavior to keep compatibility with the version in use.

### class_names

In `has_class`, `class_names` is a list:

```json
{ "name": "class_names", "value": ["container"] }
```

## How this file is used in the flow

1. The workflow in `.github/workflows/classroom.yml` calls the autograder action.
2. The action loads `criteria.json`.
3. Each block and subblock is traversed, executing the defined tests.
4. Results compose the evaluation according to applied weights and tests.
5. Final display is governed by `feedback.json`.

## How to add a new test

Example: require a `section` tag in HTML.

```json
{
  "file": "submission/index.html",
  "name": "has_tag",
  "parameters": [
    { "name": "tag", "value": "section" },
    { "name": "required_count", "value": 1 }
  ]
}
```

Recommended steps:

1. Choose the correct block in `subjects`.
2. Add the test in `tests`.
3. Confirm the target file in the `file` field.
4. Validate correct parameters for the test type.
5. Open a PR to validate in GitHub Actions.

## Relationship with other files

- `feedback.json`: defines how to show the result.
- `classroom.yml`: defines when and how to run the evaluation.
