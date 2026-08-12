let state = [];
let filterMode = 'all';
let sortMode = 'default';
let autoHide = true;

function init() {
  state = loadState(WORDS);
  render();
}

function render() {
  const grid = document.getElementById('wordGrid');
  if (!grid) return;
  let html = '';
  let totalDontKnow = 0;
  let totalKnown = 0;
  let indices = WORDS.map((_, i) => i);
  if (sortMode === 'dontKnow')
    indices.sort((a, b) => state[b].dontKnow - state[a].dontKnow || a - b);
  indices.forEach(i => {
    const w = WORDS[i];
    const s = state[i];
    if (filterMode === 'dontknow' && s.known) return;
    if (filterMode === 'known' && !s.known) return;
    totalDontKnow += s.dontKnow;
    if (s.known) totalKnown++;
    const cnClass = s.shown ? '' : 'hidden';
    const knownBtnText = s.known ? '✓已认识' : '认识';
    const knownBtnDisabled = s.known ? 'disabled' : '';
    html += `<div class="card${s.known ? ' known' : ''}">
      ${w[2] ? `<div class="added">${w[2]}</div>` : ''}
      <div class="en" onclick="toggleTranslation(${i})">${w[0]}</div>
      <div class="cn ${cnClass}" onclick="toggleTranslation(${i})">${w[1]}</div>
      <div class="row2">
        <span class="count">${s.dontKnow > 0 ? '✗'.repeat(s.dontKnow) : ''}</span>
        <span class="actions">
          <button class="btn-act btn-known" onclick="markKnown(${i})" ${knownBtnDisabled}>${knownBtnText}</button>
          <button class="btn-act dont-know" onclick="addDontKnow(${i})">+1</button>
        </span>
      </div>
    </div>`;
  });
  grid.innerHTML = html;
  document.getElementById('totalCount').textContent = WORDS.length;
  document.getElementById('dontKnowCount').textContent = totalDontKnow;
  document.getElementById('knownCount').textContent = totalKnown;
  const sDef = document.getElementById('sortDefaultBtn');
  const sDk = document.getElementById('sortDontKnowBtn');
  if (sDef) { sDef.style.borderColor = sortMode === 'default' ? '#4f46e5' : '#d1d5db'; sDef.style.color = sortMode === 'default' ? '#4f46e5' : '#555'; }
  if (sDk) { sDk.style.borderColor = sortMode === 'dontKnow' ? '#4f46e5' : '#d1d5db'; sDk.style.color = sortMode === 'dontKnow' ? '#4f46e5' : '#555'; }
  saveState(state);
}

function toggleTranslation(i) {
  state[i].shown = !state[i].shown;
  if (autoHide) {
    state.forEach((s, j) => { if (j !== i) s.shown = false; });
  }
  render();
}

function markKnown(i) {
  if (state[i].known) return;
  state[i].known = true;
  state[i].shown = false;
  render();
}

function addDontKnow(i) {
  state[i].dontKnow++;
  state[i].known = false;
  state[i].shown = false;
  render();
}

function resetAll() {
  if (!confirm('确定重置所有不认识计数？')) return;
  state = state.map(s => ({ ...s, dontKnow: 0 }));
  render();
}

function clearMemory() {
  if (!confirm('确定清除所有记忆数据（不认识计数和认识标记）？此操作不可恢复！')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = WORDS.map(() => ({ dontKnow: 0, known: false, shown: false }));
  render();
}

function filterAll() { filterMode = 'all'; render(); }
function filterDontKnow() { filterMode = 'dontknow'; render(); }
function filterKnown() { filterMode = 'known'; render(); }
function setSort(mode) { sortMode = mode; render(); }
function toggleAutoHide() { autoHide = document.getElementById('autoHide').checked; }

function doExport() {
  exportBackup(state, WORDS);
}

function doImport() {
  document.getElementById('importInput').click();
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  importBackup(file).then(data => {
    const choice = confirm('点击"确定"=合并（保留当前认识状态，补充新词）\n点击"取消"=替换（完全用备份覆盖当前数据）');
    if (choice) {
      const result = mergeBackup(data, state, WORDS);
      WORDS.length = 0;
      result.words.forEach(w => WORDS.push(w));
      state = result.state;
      render();
      alert('合并完成！单词总数：' + WORDS.length);
    } else {
      const newState = data.words.map((item, i) => ({
        dontKnow: item.state.dontKnow || 0,
        known: item.state.known || false,
        shown: false
      }));
      WORDS.length = 0;
      data.words.forEach(w => WORDS.push([w.en, w.cn, w.date || null]));
      state = newState;
      render();
      alert('替换完成！单词总数：' + WORDS.length);
    }
  }).catch(err => {
    alert('导入失败：' + err.message);
  });
  event.target.value = '';
}

document.addEventListener('DOMContentLoaded', init);
