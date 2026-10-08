# Requirement review

The plan is fixed in `src/plan/sections.ts`, one commentable line per row. Firestore stores comments only. Each comment keeps the parent `sectionId` and the line id in `anchorId`.

```bash
npm run dev
```

Deploy the comment rules and index before the first comment:

```bash
npx firebase-tools deploy --only firestore --project usas-ec981
```

Deploy the site after a production build:

```bash
npm run build
npx firebase-tools deploy --only hosting --project usas-ec981
```
