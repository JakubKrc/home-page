async function loadProjects() {
    try{
        const response = await fetch('projects.json')
            if(!response.ok) {
                throw new Error('Couldnt load projects.json')
            }
            const data = await response.json()
            return data
    } catch (error) {
        console.error('Error loading JSON: ', error)
        return []
    }
}

fetch('https://api.github.com/users/octocat')
  .then(response => {
    console.log('Rate Limit for Github:', response.headers.get('X-RateLimit-Limit'));
    console.log('Remaining loads of description of repositories:', response.headers.get('X-RateLimit-Remaining'));
    console.log('Reset Time:', new Date(response.headers.get('X-RateLimit-Reset') * 1000));
  });

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

if (isTouchDevice && isSmallScreen) {
  document.documentElement.classList.add('touch-device');
}