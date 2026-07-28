# Chai LLM

**Short description:** Chat with your PDFs, notes, and YouTube videos — a source-grounded notebook UI with citations.

A source-grounded chat notebook UI. Add PDFs, text files, or YouTube links, then ask questions about them in a clean chat interface with citation chips.

> **Status:** Frontend UI is in place. Chat replies are currently **demo placeholders**. Source upload, indexing, and a real LLM backend are planned next.

---

## Features

- **Source management** — Add knowledge sources from a modal with three types:
  - **PDF** — upload `.pdf` files
  - **Text file** — upload `.txt` or `.md` files
  - **YouTube** — paste a public YouTube / `youtu.be` URL
- **Navigation drawer** — hamburger menu lists Home / Features and shows all added sources with type badges
- **Chat panel** — ask questions about your sources
  - Suggested starter prompts when the chat is empty
  - User / assistant message bubbles
  - Citation chips on assistant replies (demo data today)
  - Clear chat, auto-scroll, and Enter-to-send (Shift+Enter for a new line)
- **Accessible UI** — dialogs, tabs, aria labels, Escape-to-close, and focus-friendly controls
- **Light & dark** — follows `prefers-color-scheme`

---

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Lint | Oxlint |
| Styling | Component-scoped CSS |

---

## Project structure

```
src/
├── App.tsx                 # Root state: sources + add-source modal
├── main.tsx                # React entry
├── index.css               # Global tokens & layout
├── types/
│   └── source.ts           # Source / SourceType models
└── components/
    ├── Navbar.tsx          # Top bar + sources drawer
    ├── AddSourceModal.tsx  # PDF / text / YouTube picker
    └── chat/
        ├── ChatPanel.tsx   # Chat shell & demo send flow
        ├── ChatComposer.tsx
        ├── HelperPrompts.tsx
        ├── MessageList.tsx
        ├── MessageBubble.tsx
        └── types.ts        # Chat / Reference models
```

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: current LTS)
- npm (comes with Node)

### Install

```bash
git clone https://github.com/YogyaChhatwani/chai_llm.git
cd chai_llm
npm install
```

### Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

`build` type-checks with `tsc` and outputs static assets to `dist/`.

### Lint

```bash
npm run lint
```

---

## How to use the app

1. Click **Add a source** in the navbar (or open the menu and use **+ Add**).
2. Choose a tab — **PDF**, **Text file**, or **YouTube** — and submit.
3. Open the menu to see your sources listed with counts and types.
4. In **Chat**, pick a suggested question or type your own and press **Send**.
5. Use **Clear chat** to reset the conversation.

Sources live in React state for the current session only (they are not persisted yet).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

---

## Current limitations

- Assistant answers are **mocked** with a short timeout (no API / model yet).
- Uploaded files and YouTube URLs are stored as metadata in memory — no parsing, embedding, or RAG pipeline yet.
- Sources and chat history are **not persisted** across reloads.
- Citation clicks currently log to the console for wiring later.

---

## Roadmap (suggested)

- [ ] Backend API for source upload and ingestion
- [ ] PDF / text extraction and YouTube transcript fetching
- [ ] Embeddings + retrieval (RAG)
- [ ] Stream real model responses into the chat UI
- [ ] Persist sources and conversations (DB / local storage)
- [ ] Deep-link citations back to the matching source passage

---

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes with clear, focused commits.
3. Run `npm run lint` and `npm run build` before opening a PR.
4. Open a pull request against `main` with a short summary of what changed and how to test it.

---

## License

Private project (`"private": true` in `package.json`). Add a license file if you decide to open-source it.

---

## Acknowledgments

Built with [React](https://react.dev/), [Vite](https://vite.dev/), and [TypeScript](https://www.typescriptlang.org/).
)
