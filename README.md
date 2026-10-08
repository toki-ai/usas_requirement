# Requirement review

The plan is fixed in `src/plan/sections.ts`, one commentable line per row. Firestore stores comments only. Each comment keeps the parent `sectionId` and the line id in `anchorId`.

```bash
npm run dev
```

Deploy the comment rules and index before the first comment:

```bash
npx firebase-tools deploy --only firestore --project usas-ec981
```

Every code change must update `src/plan/updated.ts` in the same commit. `at` is the current time in UTC+7, formatted `YYYY-MM-DD HH:mm`. `by` is the GitHub username. This check runs on every push to `main` and every pull request.

Deploy the site after a production build:

```bash
npm run build
npx firebase-tools deploy --only hosting --project usas-ec981
```
