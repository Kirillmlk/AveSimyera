import './style.css'

const toggle = document.getElementById('mobile-menu-toggle')
const menu = document.getElementById('mobile-menu')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('t-menuburger_opened')
    menu.classList.toggle('hidden', !isOpen)
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  })
}
