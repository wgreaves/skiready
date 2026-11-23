function recommend(experience, goal) {
  if (experience === 'new') return {title:'First Tracks', anchor:'first', text: goal === 'course' ? 'Start with confident deep-water starts and balanced rides on two skis. These fundamentals lay the foundation for your longer-term course goal.' : 'Begin with equipment orientation, hand signals, and a comfortable deep-water start. Your first milestone is a short, balanced ride.'};
  if (experience === 'slalom' && goal !== 'confidence') return {title:'Course Ready', anchor:'course', text:'Work on repeatable rhythm and turn consistency. Choose one focus with your coach and build toward a practical next buoy milestone.'};
  return {title:'Find Your Edge', anchor:'edge', text: goal === 'course' ? 'Refine your balance and controlled edge changes before moving toward course work. Let your coach confirm the right progression.' : 'Build confidence through balanced posture, handle control, and smoother changes of direction. Make one improvement your focus for the next set.'};
}
const video = document.getElementById('hero-video');
const toggle = document.getElementById('video-toggle');
if (video && toggle) {
  const sync = () => {toggle.textContent = video.paused ? 'Play video' : 'Pause video'; toggle.setAttribute('aria-pressed', String(video.paused));};
  toggle.addEventListener('click', () => {if (video.paused) video.play().catch(sync); else video.pause();});
  video.addEventListener('play', sync); video.addEventListener('pause', sync);
  video.querySelector('source').addEventListener('error', () => {document.getElementById('video-error').hidden = false;});
  video.play().catch(sync);
}
const quiz = document.getElementById('training-quiz');
if (quiz) quiz.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(quiz), rec = recommend(data.get('experience'), data.get('goal'));
  const result = document.getElementById('quiz-result'); result.hidden = false; result.replaceChildren();
  const title = document.createElement('h3'), text = document.createElement('p'), link = document.createElement('a');
  title.textContent = rec.title; text.textContent = rec.text; link.textContent = 'Explore this session'; link.href = 'training.html#' + rec.anchor;
  result.append(title, text, link);
});
