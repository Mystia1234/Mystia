const tabs = document.querySelectorAll('.tab');
const newsItems = document.querySelectorAll('.news-list li');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    const kind = tab.dataset.tab;
    newsItems.forEach(item => {
      item.style.display = item.dataset.kind === kind ? 'flex' : 'none';
    });
  });
});

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}
document.querySelectorAll('.login-open').forEach(button => button.addEventListener('click', () => openModal('로그인')));
document.querySelectorAll('.join-open').forEach(button => button.addEventListener('click', () => openModal('모험가 등록')));
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
document.querySelector('.modal-submit').addEventListener('click', () => {
  alert('시안 페이지입니다. 실제 로그인 및 회원가입 기능은 연결되어 있지 않습니다.');
});


// GAME START: fake launcher sequence for the character-pair concept page
const startButton = document.getElementById('game-start');
const startModal = document.getElementById('start-modal');
const startClose = document.getElementById('start-close');
const startDone = document.getElementById('start-done');
const progressFill = document.getElementById('start-progress-fill');
const percentText = document.getElementById('start-percent');
const progressLabel = document.getElementById('start-progress-label');
const statusText = document.getElementById('start-status');
const logText = document.getElementById('start-log');
const reveal = document.getElementById('start-reveal');
let launchTimer = null;

function closeStartModal() {
  if (launchTimer) clearInterval(launchTimer);
  startModal.classList.remove('show');
  startModal.setAttribute('aria-hidden', 'true');
  startButton.focus();
}

startButton.addEventListener('click', () => {
  if (launchTimer) clearInterval(launchTimer);
  let progress = 0;
  progressFill.style.width = '0%';
  percentText.textContent = '0%';
  progressLabel.textContent = 'INITIALIZING';
  statusText.textContent = '게임 클라이언트를 확인하고 있습니다...';
  logText.textContent = '시스템 연결 대기 중...';
  reveal.hidden = true;
  startClose.disabled = true;
  startModal.classList.add('show');
  startModal.setAttribute('aria-hidden', 'false');

  launchTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.floor(Math.random() * 8) + 4);
    progressFill.style.width = progress + '%';
    percentText.textContent = progress + '%';
    if (progress < 28) {
      progressLabel.textContent = 'CONNECTING';
      statusText.textContent = '게임 서버에 접속하고 있습니다...';
      logText.textContent = '서버 응답 확인 중...';
    } else if (progress < 58) {
      progressLabel.textContent = 'LOADING DATA';
      statusText.textContent = '게임 데이터를 불러오는 중입니다...';
      logText.textContent = '월드 데이터 및 모험가 정보를 불러오는 중...';
    } else if (progress < 86) {
      progressLabel.textContent = 'PREPARING';
      statusText.textContent = '마지막 준비를 진행하고 있습니다...';
      logText.textContent = '미스티아 항구의 문을 여는 중...';
    } else if (progress < 100) {
      progressLabel.textContent = 'ALMOST READY';
      statusText.textContent = '잠시만 기다려 주세요.';
      logText.textContent = '접속을 마무리하고 있습니다...';
    } else {
      clearInterval(launchTimer);
      launchTimer = null;
      progressLabel.textContent = 'COMPLETE';
      statusText.textContent = '준비가 완료되었습니다!';
      logText.textContent = '런처 실행 완료.';
      reveal.hidden = false;
      startClose.disabled = false;
    }
  }, 180);
});

startClose.addEventListener('click', closeStartModal);
startDone.addEventListener('click', closeStartModal);
startModal.addEventListener('click', event => { if (event.target === startModal && !startClose.disabled) closeStartModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && startModal.classList.contains('show') && !startClose.disabled) closeStartModal(); });
