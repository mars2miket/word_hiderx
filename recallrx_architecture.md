# RecallRx Architecture Design Document

This document outlines both the business operations framework and the underlying technical architecture of the RecallRx web application.

```text
RecallRx/
├── [BUSINESS OPERATIONS PERSPECTIVE]
│   ├── Target Value Proposition & Purpose
│   │   ├── Active Recall Memorization Utility (Two-column self-testing system)
│   │   ├── Fluid Data Importation (Direct migration from existing Excel/Sheets study workflows)
│   │   └── Native Bilingual Localization Framework (English / Vietnamese core modules)
│   │
│   ├── User Engagement & Operational Verticals
│   │   ├── Decks & Lists Management (Creating, renaming, clearing, and purging curated sets)
│   │   ├── Contextual Annotation (Free-form study notes pinned alongside active decks)
│   │   ├── Multimodal Testing Engine (Active validation via Multi-Choice, True/False, or Fill-in-the-Blank)
│   │   └── Progress Analytics Dashboard (Aggregating test metrics, history, and top structural weaknesses)
│   │
│   └── Operational Logistics & Data Ownership
│       ├── Zero Server-Overhead Architecture (Completely client-side local runtime execution)
│       ├── Permanent Local Sovereignty (Data lives entirely inside user's local browser instance)
│       └── Portable Asset Lifecycle (Open system migration via plain-text CSV/TSV/TXT imports & exports)
│
└── [TECHNICAL ARCHITECTURE PERSPECTIVE]
    ├── Global Runtime State & Context Layer (Vanilla Pub/Sub Observer Pattern)
    │   ├── window.getState() -> Fetches immutable atomic snapshot of app memory
    │   ├── window.setState() -> Commits state changes and triggers synchronous subscriber dispatches
    │   └── window.subscribe() -> Reactively registers structural UI render functions across independent modules
    │
    ├── Core Infrastructure Modules
    │   ├── storage.js (Data Encryption & Browser Persistence Boundary)
    │   │   ├── Namespaced LocalStorage Isolation (Prefix engine: `recallrx:`)
    │   │   ├── State Mutation Pipeline (Implicitly auto-commits runtime state to browser storage)
    │   │   └── Legacy Schema Migration Pipeline (Automated parsing/transform of archaic keys on boot)
    │   │
    │   ├── main.js (App Bootstrapper & Lifecycle Conductor)
    │   │   ├── Evaluates and executes prerequisite storage version migrations
    │   │   ├── Deserializes local browser storage arrays into global memory layout
    │   │   └── Sequences execution of modular UI init sub-routines safely
    │   │
    │   └── workspace-toggle.js (View state Orchestration and Presentation Router)
    │       ├── Tracks active macro layout context across CSS layout hooks via body elements
    │       └── Auto-serializes active state matrices prior to committing cross-view shifts
    │
    ├── Operational Feature Engines
    │   ├── grid.js (Interactive Multi-Column Spreadsheet Component)
    │   │   ├── Event Delegation Matrix (Bound to container boundaries for input, focus, blur, and paste)
    │   │   ├── Context-Aware Clipboard Parsing (Cleans raw text/pasted Excel HTML into tab-separated cells)
    │   │   ├── Conditional Visibility Masking Engine (Dynamic injection/retrieval of masked DOM markup nodes)
    │   │   └── Auto-Append Row Generator (Real-time dynamic entry monitoring)
    │   │
    │   ├── exam-v2.js (Stateful Quiz Engine)
    │   │   ├── Prompt Compactor & Item Normalization Engine (Combines duplicate multi-row prompt variations)
    │   │   ├── Pseudo-Randomization Pipeline (Fisher-Yates deck shuffle mechanics)
    │   │   ├── Adaptive Wrong-Answer Distractor Pooler (Extracts target incorrect keys from peer lists)
    │   │   ├── Volatile State Session Recovery Tracker (Maintains quiz context over hard tab refreshes)
    │   │   ├── Score Ring Visualizer (Animated SVG coordinate offsets tracking test grade percentage metrics)
    │   │   └── Persistent Weakness Injector (Pushes incorrect answers directly to structural mistake arrays)
    │   │
    │   ├── analytics.js (Metrics Aggregation Log Interpreter)
    │   │   ├── Custom Log Serialization Parser (Tokenizes historic log outputs across raw file segments)
    │   │   ├── Aggregate Trend Reducer (Extracts test totals, session summaries, and raw correct-to-total ratios)
    │   │   └── Failure Frequency Weighting Engine (Orders missed string occurrences for Top-5 dashboard)
    │   │
    │   ├── qbank.js (Asynchronous Remote Dataset Seed Component)
    │   │   ├── Non-blocking Network Fetch Controller (Retrieves and processes detached CSV resources)
    │   │   ├── Deterministic Identifier Generator (Hashing unique question prompts via a `cyrb53` engine)
    │   │   └── Usage Allocation Gatekeeper (Blocks/resets categories via persistent indexing hashes)
    │   │
    │   └── lists.js / notes.js (Structured Content Input Managers)
    │       ├── File Input Read Stream Controllers (Validates file types, handles file sizes, outputs string objects)
    │       ├── Asset Serialization Pipeline (Compiles runtime matrices to clean Tab-Separated Values)
    │       └── Memory Lock Safety Gates (Mitigates edits/purges to structural log entities)
    │
    └── External Interface Boundary
        └── Web Speech API Wrapper (Native platform synthesis integration via reactive layout speeds)
```