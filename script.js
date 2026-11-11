const themeToggle = document.querySelector('#theme-toggle');
const themeStorageKey = 'comit-theme';
const themeColor = document.querySelector('meta[name="theme-color"]');
const studySearch = document.querySelector('#study-search');
const studyCategory = document.querySelector('#study-category');
const studyCards = Array.from(document.querySelectorAll('.study-card'));
const studySearchEmpty = document.querySelector('#study-search-empty');

function filterStudies() {
  const query = studySearch.value.trim().toLocaleLowerCase();
  const category = studyCategory.value;
  let visibleCount = 0;

  studyCards.forEach((card) => {
    const title = card.querySelector('summary h3').textContent.trim().toLocaleLowerCase();
    const matches = title.includes(query) && (!category || card.dataset.category === category);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  studySearchEmpty.hidden = visibleCount > 0;
}

studySearch.addEventListener('input', filterStudies);
studyCategory.addEventListener('change', filterStudies);
filterStudies();

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
  themeToggle.querySelector('span').textContent = isDark ? '☀' : '☾';
  themeColor.setAttribute('content', isDark ? '#101914' : '#f5f6f2');
}

try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
} catch (error) {
  setTheme('light');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    // 저장소를 사용할 수 없어도 현재 페이지의 테마 전환은 유지합니다.
  }
});
