# Project Instructions

## Goal
This project should stay maintainable, scalable, and easy to review.
Prefer minimal-change implementation over large redesigns.

## File organization
- Reusable UI components must go in `/src/components/ui`
- Page sections must go in `/src/components/sections`
- Layout components must go in `/src/components/layout`
- Shared data and copy should go in `/src/data`
- Helper functions should go in `/src/utils`
- Documentation and implementation notes should go in `/docs`

## Design rules
- Use MUI for UI implementation
- Follow the existing design pattern as much as possible
- Prioritize layout improvement over visual redesign
- Prefer mobile-friendly responsive implementation
- Avoid one-off styling unless necessary

## Editing behavior
- Propose a plan before making major changes
- Prefer editing existing files instead of creating new files
- Do not create duplicate files with names like `new`, `final`, `v2`, `copy`
- Do not place large reusable components directly inside page files
- Do not mix experimental code into production files unless explicitly requested

## Output format
When making changes, always summarize:
1. which files were changed
2. why they were changed
3. whether any redundant files/components were found