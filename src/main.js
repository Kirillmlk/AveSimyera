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

if (softGroupToggle && softGroupSublist && softGroupArrow) {
  softGroupToggle.addEventListener('click', () => {
    const isHidden = softGroupSublist.classList.toggle('hidden')
    // закрыто — стрелка вправо, открыто — вниз
    softGroupArrow.classList.toggle('rotate-90', !isHidden)
  })
}

if (caseGroupToggle && caseGroupSublist && caseGroupArrow) {
  caseGroupToggle.addEventListener('click', () => {
    const isHidden = caseGroupSublist.classList.toggle('hidden')
    // закрыто — стрелка вправо, открыто — вниз
    caseGroupArrow.classList.toggle('rotate-90', !isHidden)
  })
}

if (categoryFilterButtons.length && catalogCards.length) {
  categoryFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-category-filter')

      categoryFilterButtons.forEach((btn) => {
        btn.classList.remove('catalog-part-active')
      })
      button.classList.add('catalog-part-active')

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

      // подсветку для сабкатегорий пока не делаем, управляем только карточками
      catalogCards.forEach((card) => {
        const cardSub = card.getAttribute('data-subcategory')
        const shouldShow = cardSub === value
        card.classList.toggle('hidden', !shouldShow)
      })
    })
  })
}

const galleryMainImg = document.querySelector('.gallery__main img')
const galleryThumbImages = document.querySelectorAll('.gallery__thumb-item img')
const galleryPrev = document.querySelector('.gallery__arrow_prev')
const galleryNext = document.querySelector('.gallery__arrow_next')

if (galleryMainImg && galleryThumbImages.length) {
  let currentIndex = 0

  const setActiveSlide = (index) => {
    const clampedIndex = (index + galleryThumbImages.length) % galleryThumbImages.length
    const thumb = galleryThumbImages[clampedIndex]
    const fullSrc = thumb.getAttribute('data-full') || thumb.src

    galleryMainImg.src = fullSrc

    galleryThumbImages.forEach((img) => {
      img.parentElement?.classList.remove('gallery__thumb-item_active')
    })
    thumb.parentElement?.classList.add('gallery__thumb-item_active')

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

  // начальное активное изображение
  setActiveSlide(0)
}
