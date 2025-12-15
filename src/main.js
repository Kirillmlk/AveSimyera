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

const heroSection = document.querySelector('.main-hero-section')
const heroTitleMain = document.getElementById('hero-title-main')
const heroTitleSub = document.getElementById('hero-title-sub')
const heroDescr = document.getElementById('hero-descr')
const heroButton = document.getElementById('hero-button')
const heroPrev = document.querySelector('.hero-arrow-prev')
const heroNext = document.querySelector('.hero-arrow-next')
const heroBullets = document.querySelectorAll('.hero-bullet')

if (
  heroSection &&
  heroTitleMain &&
  heroTitleSub &&
  heroDescr &&
  heroButton &&
  heroPrev &&
  heroNext
) {
  const heroSlides = [
    {
      bg: "url('https://static.tildacdn.pub/tild3965-6336-4532-a636-393563666237/Gemini_Generated_Ima.png')",
      titleMain: 'AveSimyera',
      titleSub: 'Structural Excellence',
      descr: 'Мягкая и корпусная мебель напрямую от производителя',
      buttonText: 'За покупками',
      buttonHref: '#catalog',
    },
    {
      bg: "url('https://static.tildacdn.pub/tild6366-3266-4361-a464-303339363330/2.png')",
      titleMain: 'AveSimyera',
      titleSub: 'Structural Excellence',
      descr: 'Скидки и акции на готовые коллекции',
      buttonText: 'Смотреть',
      buttonHref: '#catalog',
    },
    {
      bg: "url('https://static.tildacdn.pub/tild3633-3061-4531-b334-316332633762/4.png')",
      titleMain: 'AveSimyera',
      titleSub: 'Structural Excellence',
      descr: 'Изготовим мебель под ваши индивидуальные запросы',
      buttonText: 'Контакты',
      buttonHref: '#contacts',
    },
  ]

  const heroFadeContainer = document.querySelector('.hero-fade')

  let heroIndex = 0

  const renderHero = () => {
    const slide = heroSlides[heroIndex]

    if (heroFadeContainer) {
      heroFadeContainer.classList.add('hero-fade-hidden')
      setTimeout(() => {
        heroSection.style.backgroundImage = slide.bg
        heroTitleMain.textContent = slide.titleMain
        heroTitleSub.textContent = slide.titleSub
        heroDescr.textContent = slide.descr
        heroButton.textContent = slide.buttonText
        heroButton.setAttribute('href', slide.buttonHref)
        if (heroBullets.length) {
          heroBullets.forEach((bullet, index) => {
            bullet.classList.toggle('hero-bullet-active', index === heroIndex)
          })
        }
        heroFadeContainer.classList.remove('hero-fade-hidden')
      }, 500)
    } else {
      heroSection.style.backgroundImage = slide.bg
      heroTitleMain.textContent = slide.titleMain
      heroTitleSub.textContent = slide.titleSub
      heroDescr.textContent = slide.descr
      heroButton.textContent = slide.buttonText
      heroButton.setAttribute('href', slide.buttonHref)
      if (heroBullets.length) {
        heroBullets.forEach((bullet, index) => {
          bullet.classList.toggle('hero-bullet-active', index === heroIndex)
        })
      }
    }
  }

  heroPrev.addEventListener('click', () => {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length
    renderHero()
  })

  heroNext.addEventListener('click', () => {
    heroIndex = (heroIndex + 1) % heroSlides.length
    renderHero()
  })

  if (heroBullets.length) {
    heroBullets.forEach((bullet) => {
      bullet.addEventListener('click', () => {
        const slideIndexAttr = bullet.getAttribute('data-hero-slide')
        if (!slideIndexAttr) return
        const slideIndex = parseInt(slideIndexAttr, 10)
        if (Number.isNaN(slideIndex)) return
        heroIndex = slideIndex % heroSlides.length
        renderHero()
      })
    })
  }

  renderHero()
}
