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
const softGroupToggle = document.querySelector('[data-catalog-group="soft"]')
const softGroupSublist = document.querySelector('[data-catalog-sub="soft"]')
const softGroupArrow = document.querySelector('[data-catalog-group-arrow="soft"]')
const caseGroupToggle = document.querySelector('[data-catalog-group="case"]')
const caseGroupSublist = document.querySelector('[data-catalog-sub="case"]')
const caseGroupArrow = document.querySelector('[data-catalog-group-arrow="case"]')
const categoryFilterButtons = document.querySelectorAll('[data-category-filter]')
const subcategoryFilterButtons = document.querySelectorAll('[data-subcategory-filter]')
const catalogCards = document.querySelectorAll('.catalog-card[data-category]')
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

  const heroFadeContainer = document.querySelector('.main-hero-section')

  let heroIndex = 0

  const renderHero = () => {
    const slide = heroSlides[heroIndex]

    if (heroFadeContainer) {
      heroFadeContainer.classList.add('opacity-0')
      setTimeout(() => {
        heroSection.style.backgroundImage = slide.bg
        heroTitleMain.textContent = slide.titleMain
        heroTitleSub.textContent = slide.titleSub
        heroDescr.textContent = slide.descr
        heroButton.textContent = slide.buttonText
        heroButton.setAttribute('href', slide.buttonHref)
        if (heroBullets.length) {
          heroBullets.forEach((bullet, index) => {
            bullet.classList.toggle('bg-white', index === heroIndex)
            bullet.classList.toggle('bg-transparent', index !== heroIndex)
          })
        }
        heroFadeContainer.classList.remove('opacity-0')
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
          bullet.classList.toggle('bg-white', index === heroIndex)
          bullet.classList.toggle('bg-transparent', index !== heroIndex)
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

if (softGroupToggle && softGroupSublist && softGroupArrow) {
  softGroupToggle.addEventListener('click', () => {
    const isHidden = softGroupSublist.classList.toggle('hidden')
    softGroupArrow.classList.toggle('rotate-90', !isHidden)
  })
}

if (caseGroupToggle && caseGroupSublist && caseGroupArrow) {
  caseGroupToggle.addEventListener('click', () => {
    const isHidden = caseGroupSublist.classList.toggle('hidden')
    caseGroupArrow.classList.toggle('rotate-90', !isHidden)
  })
}

if (categoryFilterButtons.length && catalogCards.length) {
  categoryFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-category-filter')

      categoryFilterButtons.forEach((btn) => {
        btn.classList.remove('font-semibold')
      })
      button.classList.add('font-semibold')

      catalogCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category')
        const shouldShow = value === 'all' || value === cardCategory
        card.classList.toggle('hidden', !shouldShow)
      })
    })
  })
}

if (subcategoryFilterButtons.length && catalogCards.length) {
  subcategoryFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-subcategory-filter')
      if (!value) return

      catalogCards.forEach((card) => {
        const cardSub = card.getAttribute('data-subcategory')
        const shouldShow = cardSub === value
        card.classList.toggle('hidden', !shouldShow)
      })
    })
  })
}

const galleryMainImg = document.querySelector('.gallery_main img')
const galleryThumbImages = document.querySelectorAll('.gallery_thumb-item img')
const galleryPrev = document.querySelector('.gallery_arrow_prev')
const galleryNext = document.querySelector('.gallery_arrow_next')

if (galleryMainImg && galleryThumbImages.length) {
  let currentIndex = 0

  const setActiveSlide = (index) => {
    const clampedIndex = (index + galleryThumbImages.length) % galleryThumbImages.length
    const thumb = galleryThumbImages[clampedIndex]
    const fullSrc = thumb.getAttribute('data-full') || thumb.src

    galleryMainImg.src = fullSrc

    galleryThumbImages.forEach((img) => {
      img.parentElement?.classList.remove('outline', 'outline-2', 'outline-black')
    })
    thumb.parentElement?.classList.add('outline', 'outline-2', 'outline-black')

    currentIndex = clampedIndex
  }

  galleryThumbImages.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setActiveSlide(index)
    })
  })

  if (galleryPrev) {
    galleryPrev.addEventListener('click', () => {
      setActiveSlide(currentIndex - 1)
    })
  }

  if (galleryNext) {
    galleryNext.addEventListener('click', () => {
      setActiveSlide(currentIndex + 1)
    })
  }

  setActiveSlide(0)
}

const videoPlayButton = document.querySelector('.video-play-btn')
const videoContainer = document.getElementById('video-container')
const videoIframe = document.getElementById('video-iframe')

if (videoPlayButton && videoContainer && videoIframe) {
  const videoId = videoPlayButton.getAttribute('data-video-id')

  videoPlayButton.addEventListener('click', () => {
    if (videoId) {
      videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
      videoContainer.classList.add('active')
      videoPlayButton.style.display = 'none'
    }
  })
}

// Smooth scroll for anchor links with custom duration
const anchorLinks = document.querySelectorAll('a[href^="#"]')

const smoothScrollTo = (targetY, duration = 1200) => {
  const startY = window.scrollY || window.pageYOffset
  const distance = targetY - startY
  let startTime = null

  const step = (timestamp) => {
    if (startTime === null) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, startY + distance * ease)
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return
    const id = href.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    const rect = target.getBoundingClientRect()
    const targetY = window.pageYOffset + rect.top
    smoothScrollTo(targetY, 1400)

    // optionally close mobile menu if open
    if (menu && toggle && !menu.classList.contains('hidden')) {
      toggle.classList.remove('t-menuburger_opened')
      menu.classList.add('hidden')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })
})
