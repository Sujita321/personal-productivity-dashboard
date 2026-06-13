# ZenDash

A personal productivity dashboard built with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no npm. Just open `index.html` in a browser and it works.

## What it does

**Live clock and greeting** — shows the current time, updated every second. The greeting changes automatically based on time of day (morning, afternoon, evening).

**Task tracker** — add tasks, mark them done, delete them. Tasks are saved in localStorage so they survive a page refresh. Trying to add an empty task shows a warning instead of silently failing.

**Budget calculator** — enter a total budget and your expenses, get the remaining balance. Goes red if you're over budget.

**Light/dark mode** — toggle between a warm sand-toned light theme and a dark mode. Your preference is remembered.

## How to run it

Download the folder, double-click `index.html`. That's it.

## Files

```
zendash/
├── index.html
├── style.css
└── script.js
```

## Notes

All three files are kept as simple as possible — no arrow functions, no modules, no build step. localStorage is used for both theme preference and task persistence. The task list is rebuilt from scratch every time something changes, which keeps the logic easy to follow.
