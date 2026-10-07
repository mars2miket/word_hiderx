/**
 * notes.js — classic script.
 * Manages the Notes accordion and the note textarea.
 */
(function () {
  'use strict';

  var selectEl, newBtn, renameBtn, deleteBtn, noteArea, noteResizer, workspace;

  function initNotes() {
    selectEl    = document.getElementById('note-select');
    newBtn      = document.getElementById('note-new-btn');
    renameBtn   = document.getElementById('note-rename-btn');
    deleteBtn   = document.getElementById('note-delete-btn');
    noteArea    = document.getElementById('note-area');
    noteResizer = document.getElementById('note-resizer');
    workspace   = document.querySelector('.input-workspace');

    refreshSelect();

    window.subscribe(function (state, prev) {
      if (state.notes !== prev.notes || state.activeNote !== prev.activeNote || state.noteActive !== prev.noteActive) {
        refreshSelect();
        applyNoteMode();
      }
    });

    if (selectEl)  selectEl.addEventListener('change', onSelectChange);
    if (newBtn)    newBtn.addEventListener('click', onNewNote);
    if (renameBtn) renameBtn.addEventListener('click', onRenameNote);
    if (deleteBtn) deleteBtn.addEventListener('click', onDeleteNote);
    if (noteArea)  noteArea.addEventListener('input', onNoteInput);
    if (noteResizer) initResize();

    // Restore note mode if we were in it last session
    var savedMode = window.storage.get('mode', 'grid');
    var savedName = window.storage.get('activeNote', null);
    var st = window.getState();
    if (savedMode === 'note' && savedName && savedName in st.notes) {
      enterNote(savedName);
    }
  }

  // ─── Dropdown ────────────────────────────────────────────────────────────
  function refreshSelect() {
    if (!selectEl) return;
    var state = window.getState();
    var names = Object.keys(state.notes || {});
    selectEl.innerHTML = '';

    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a Note';
    placeholder.disabled = false;
    selectEl.appendChild(placeholder);

    names.forEach(function (name) {
      var op = document.createElement('option');
      op.value = name;
      op.textContent = name;
      selectEl.appendChild(op);
    });

    selectEl.value = state.noteActive ? (state.activeNote || '') : '';
  }

  function onSelectChange() {
    var name = selectEl.value;
    if (!name) { exitNote(); return; }
    enterNote(name);
  }

  // ─── Enter / Exit ────────────────────────────────────────────────────────
  function enterNote(name) {
    var state = window.getState();
    if (!(name in state.notes)) return;

    window.setState({
      noteActive: true,
      activeNote: name
    });

    window.storage.set('mode', 'note');
    window.storage.set('activeNote', name);

    if (noteArea) noteArea.value = state.notes[name] || '';
    if (workspace) workspace.classList.add('note-mode');

    if (typeof window.updateCharCount === 'function') window.updateCharCount();
  }

  function exitNote() {
    window.setState({
      noteActive: false,
      activeNote: null
    });

    window.storage.set('mode', 'grid');
    window.storage.remove('activeNote');

    if (workspace) workspace.classList.remove('note-mode');
    if (typeof window.updateCharCount === 'function') window.updateCharCount();
  }

  function applyNoteMode() {
    var state = window.getState();
    if (state.noteActive && state.activeNote) {
      if (noteArea) noteArea.value = state.notes[state.activeNote] || '';
      if (workspace) workspace.classList.add('note-mode');
    } else {
      if (workspace) workspace.classList.remove('note-mode');
    }
  }

  // ─── New / Rename / Delete ───────────────────────────────────────────────
  function onNewNote() {
    var raw = window.prompt('New note name:');
    if (raw === null) return;
    var name = raw.trim();
    if (!name) return;

    var state = window.getState();
    if (name in state.notes) { alert('A note with that name already exists.'); return; }

    var notes = Object.assign({}, state.notes);
    notes[name] = '';

    window.setState({ notes: notes });
    enterNote(name);
  }

  function onRenameNote() {
    var state = window.getState();
    if (!state.noteActive || !state.activeNote) { alert('Select a note first.'); return; }

    var raw = window.prompt('Rename note:', state.activeNote);
    if (raw === null) return;
    var name = raw.trim();
    if (!name || name === state.activeNote) return;
    if (name in state.notes) { alert('A note with that name already exists.'); return; }

    var notes = {};
    Object.keys(state.notes).forEach(function (k) {
      notes[k === state.activeNote ? name : k] = state.notes[k];
    });

    window.setState({ notes: notes, activeNote: name });
    window.storage.set('activeNote', name);
  }

  function onDeleteNote() {
    var state = window.getState();
    if (!state.noteActive || !state.activeNote) { alert('Select a note first.'); return; }

    var target = state.activeNote;
    var doDelete = function () {
      var notes = Object.assign({}, state.notes);
      delete notes[target];
      window.setState({ notes: notes });
      exitNote();
    };

    if (typeof window.showConfirm === 'function') {
      window.showConfirm('Delete note', 'Delete "' + target + '"? This cannot be undone.', 'Delete', doDelete);
    } else if (window.confirm('Delete "' + target + '"?')) {
      doDelete();
    }
  }

  // ─── Input ───────────────────────────────────────────────────────────────
  function onNoteInput() {
    var state = window.getState();
    if (!state.noteActive || !state.activeNote) return;

    var notes = Object.assign({}, state.notes);
    notes[state.activeNote] = noteArea.value;

    window.setState({ notes: notes });
    if (typeof window.updateCharCount === 'function') window.updateCharCount();
  }

  // ─── Resizer ─────────────────────────────────────────────────────────────
  function initResize() {
    noteResizer.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      noteResizer.setPointerCapture(e.pointerId);
      var startY = e.clientY;
      var startH = noteArea.getBoundingClientRect().height;
      noteResizer.classList.add('resizing');

      function onMove(e2) {
        noteArea.style.height = Math.max(80, startH + (e2.clientY - startY)) + 'px';
      }
      function onUp(e2) {
        noteResizer.classList.remove('resizing');
        noteResizer.releasePointerCapture(e2.pointerId);
        noteResizer.removeEventListener('pointermove', onMove);
        noteResizer.removeEventListener('pointerup', onUp);
      }
      noteResizer.addEventListener('pointermove', onMove);
      noteResizer.addEventListener('pointerup', onUp);
    });
  }

  // Expose
  window.initNotes = initNotes;
})();