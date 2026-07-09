# CLAUDE.md

This repo uses **pnpm** exclusively. Run scripts with `pnpm <script>` (`pnpm dev`, `pnpm build`, `pnpm lint`) and one-off binaries with `pnpm exec <bin>`. Never use npm, npx, or yarn — they leave foreign lockfiles and artifacts in a pnpm-managed workspace.

## React

This repo compiles with React Compiler (`babel-plugin-react-compiler`). Do not add `useCallback`/`useMemo`/`memo` for identity stability or render performance — the compiler memoizes automatically. Write plain functions and values.

## Animation policy

- **CSS transitions** own state-driven property tweens: widths, fades, color shifts, anything toggled by a `data-*` attribute (e.g. `data-state` group selectors). They are cheap and interruptible by default.
- **Motion** owns discrete choreography: enter/exit (`AnimatePresence`) and staggered reveals.
- Per-frame visuals bind MotionValues via `style`; never drive them with React state.
- Do not use Motion `layout`/`layoutId` on the work columns: layout animations scale-distort 1px borders and text, and the CSS `flex-basis` transition sidesteps it.
