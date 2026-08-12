const STORAGE_KEY = 'vocabAppState';

function loadState(words) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return words.map(() => ({ dontKnow: 0, known: false, shown: false }));
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error('Invalid format');
    return words.map((_, i) => {
      if (i < parsed.length && parsed[i] && typeof parsed[i] === 'object') {
        const s = parsed[i];
        let known = !!s.known;
        if (s.known === undefined) known = s.dontKnow === 0;
        return { dontKnow: s.dontKnow || 0, known, shown: false };
      }
      return { dontKnow: 0, known: false, shown: false };
    });
  } catch (e) {
    console.warn('数据读取失败，已重建空数据（未覆盖原数据）', e.message);
    return words.map(() => ({ dontKnow: 0, known: false, shown: false }));
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY,
      JSON.stringify(state.map(s => ({ dontKnow: s.dontKnow, known: s.known }))));
  } catch (e) {
    alert('保存失败：' + e.message);
  }
}

function exportBackup(state, words) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    words: words.map((w, i) => ({
      en: w[0],
      cn: w[1],
      date: w[2] || null,
      state: state[i]
    }))
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vocab-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.words || !Array.isArray(data.words)) {
          reject(new Error('备份文件格式不正确'));
          return;
        }
        resolve(data);
      } catch (err) {
        reject(new Error('无法解析备份文件'));
      }
    };
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsText(file);
  });
}

function mergeBackup(backup, currentState, currentWords) {
  const currentKeys = new Set(currentWords.map(w => w[0].toLowerCase()));
  const outWords = currentWords.map(w => [...w]);
  const outState = currentState.map(s => ({ ...s }));
  backup.words.forEach((item, i) => {
    if (!currentKeys.has(item.en.toLowerCase())) {
      outWords.push([item.en, item.cn, item.date || null]);
      const bs = backup.words[i].state || {};
      outState.push({ dontKnow: bs.dontKnow || 0, known: bs.known || false, shown: false });
    }
  });
  return { words: outWords, state: outState };
}
