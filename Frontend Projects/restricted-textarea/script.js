(function () {
    const MAX = 200;
    const ta = document.getElementById('note');
    const counter = document.getElementById('counter');
    const maxSpan = document.getElementById('max');
    const maxHint = document.getElementById('maxHint');
    maxSpan.textContent = MAX;
    maxHint.textContent = MAX;

    function update() {
        const len = [...ta.value].length; // count unicode properly
        counter.textContent = len + ' / ' + MAX;
        if (len >= MAX) counter.classList.add('warn'); else counter.classList.remove('warn');
    }

    // prevent typing beyond MAX (handles composition events better)
    ta.addEventListener('beforeinput', (e) => {
        if (e.inputType === 'insertFromPaste') return; // allow paste handler to manage
        const current = [...ta.value].length;
        const insert = e.data ? [...e.data].length : 0;
        if (current + insert > MAX) {
            e.preventDefault();
            // optionally insert truncated chunk
            const allowed = Math.max(0, MAX - current);
            if (allowed > 0 && e.data) {
                const toInsert = [...e.data].slice(0, allowed).join('');
                const start = ta.selectionStart, end = ta.selectionEnd;
                const newVal = ta.value.slice(0, start) + toInsert + ta.value.slice(end);
                ta.value = newVal;
                // move caret
                const pos = start + toInsert.length;
                ta.setSelectionRange(pos, pos);
            }
            update();
        }
    });

    // handle paste: truncate pasted content so that total <= MAX
    ta.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const current = [...ta.value].length;
        const allowed = Math.max(0, MAX - current + (ta.selectionEnd - ta.selectionStart));
        const toInsert = [...paste].slice(0, allowed).join('');
        const start = ta.selectionStart, end = ta.selectionEnd;
        const newVal = ta.value.slice(0, start) + toInsert + ta.value.slice(end);
        ta.value = newVal;
        const pos = start + toInsert.length;
        ta.setSelectionRange(pos, pos);
        update();
    });

    ta.addEventListener('input', update);
    // initialize
    update();
})();
