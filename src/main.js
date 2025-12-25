import './style.css'

const toggle = document.getElementById('mobile-menu-toggle')
const menu = document.getElementById('mobile-menu')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden')
    const spans = toggle.querySelectorAll('span')
    if (!isOpen) {
      spans[0]?.classList.add('opacity-0')
      spans[1]?.classList.add('rotate-45')
      spans[2]?.classList.add('-rotate-45')
      spans[3]?.classList.add('opacity-0')
    } else {
      spans[0]?.classList.remove('opacity-0')
      spans[1]?.classList.remove('rotate-45')
      spans[2]?.classList.remove('-rotate-45')
      spans[3]?.classList.remove('opacity-0')
    }
    toggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false')
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

  let heroIndex = 0

  const renderHero = () => {
    const slide = heroSlides[heroIndex]

    heroSection.classList.add('opacity-0')
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
      heroSection.classList.remove('opacity-0')
    }, 500)
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
      videoContainer.classList.remove('hidden')
    videoContainer.classList.add('block')
      videoPlayButton.style.display = 'none'
    }
  })
}

const productMainImg = document.querySelector('.product-gallery-main img')
const productThumbs = document.querySelectorAll('.product-gallery-thumb img')

if (productMainImg && productThumbs.length) {
  productThumbs.forEach((thumb) => {
    const src = thumb.getAttribute('data-full') || thumb.src
    const img = new Image()
    img.src = src
  })

  const setProductImage = (thumbImg) => {
    const newSrc = thumbImg.getAttribute('data-full') || thumbImg.src
    productMainImg.src = newSrc

    productThumbs.forEach((img) => {
      img.parentElement?.classList.remove('product-gallery-thumb--active')
    })
    thumbImg.parentElement?.classList.add('product-gallery-thumb--active')
  }

  productThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      setProductImage(thumb)
    })
  })
}

const anchorLinks = document.querySelectorAll('a[href^="#"]')

const smoothScrollTo = (targetY, duration = 1200) => {
  const startY = window.scrollY || window.pageYOffset
  const distance = targetY - startY
  let startTime = null

  const step = (timestamp) => {
    if (startTime === null) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
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

    if (menu && toggle && !menu.classList.contains('hidden')) {
      const spans = toggle.querySelectorAll('span')
      spans[0]?.classList.remove('opacity-0')
      spans[1]?.classList.remove('rotate-45')
      spans[2]?.classList.remove('-rotate-45')
      spans[3]?.classList.remove('opacity-0')
      menu.classList.add('hidden')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })
})

const cartIconWrapper = document.getElementById('cart-icon-wrapper')
const cartSidebar = document.getElementById('cart-sidebar')
const cartClose = document.getElementById('cart-close')
const cartOverlay = document.getElementById('cart-overlay')

const openCart = () => {
  if (cartSidebar && cartOverlay) {
    cartOverlay.classList.remove('hidden', 'opacity-0')
    cartOverlay.classList.add('block', 'opacity-100', 'cart-overlay--shown')
    cartSidebar.classList.remove('hidden')
    cartSidebar.classList.add('block', 'cart-sidebar--shown')
    setTimeout(() => {
      const sidebarContent = cartSidebar.querySelector('.cart-sidebar-content')
      if (sidebarContent) {
        sidebarContent.classList.remove('translate-x-full')
        sidebarContent.classList.add('translate-x-0')
      }
    }, 10)
    document.body.style.overflow = 'hidden'
  }
}

const closeCart = () => {
  if (cartSidebar && cartOverlay) {
    const sidebarContent = cartSidebar.querySelector('.cart-sidebar-content')
    if (sidebarContent) {
      sidebarContent.classList.remove('translate-x-0')
      sidebarContent.classList.add('translate-x-full')
    }
    cartSidebar.classList.remove('cart-sidebar--shown')
    cartOverlay.classList.remove('cart-overlay--shown')
    setTimeout(() => {
      cartSidebar.classList.add('hidden')
      cartSidebar.classList.remove('block')
      cartOverlay.classList.add('hidden', 'opacity-0')
      cartOverlay.classList.remove('block', 'opacity-100')
      document.body.style.overflow = ''
    }, 300)
  }
}

if (cartIconWrapper && cartSidebar) {
  cartIconWrapper.addEventListener('click', openCart)
}

if (cartClose) {
  cartClose.addEventListener('click', closeCart)
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', closeCart)
}

let cartItems = []

const getProductData = (button) => {
  const card = button.closest('.catalog-card, .product-page-main, article')
  if (!card) return null

  let titleEl = card.querySelector('.catalog-card-title, #product-title, .product-title')
  let priceEl = card.querySelector('.catalog-card-price')
  let imgEl = card.querySelector('.catalog-card-img')
  let productUrl = button.closest('article')?.querySelector('.catalog-btn-main')?.getAttribute('href') || window.location.pathname
  
  if (!titleEl && card.closest('.product-page-main')) {
    titleEl = document.querySelector('#product-title')
  }
  
  if (!priceEl && (card.closest('.product-page-main') || document.querySelector('.product-page-main'))) {
    priceEl = document.querySelector('.text-2xl.font-semibold')
  }
  
  if (!imgEl && card.closest('.product-page-main')) {
    imgEl = document.querySelector('.product-gallery-main img')
  }
  
  let title = titleEl?.textContent?.trim() || ''
  let price = 0
  let imageUrl = ''
  let color = null
  
  if (priceEl) {
    let priceText = ''
    const firstTextNode = Array.from(priceEl.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
    if (firstTextNode) {
      priceText = firstTextNode.textContent.trim()
    } else {
      priceText = priceEl.textContent?.trim() || ''
      const firstPriceMatch = priceText.match(/^(\d[\d\s]*)/)
      if (firstPriceMatch) {
        priceText = firstPriceMatch[1]
      }
    }
    if (priceText) {
      price = parseInt(priceText.replace(/\s/g, ''), 10) || 0
    }
  }
  
  if (imgEl) {
    if (imgEl.style && imgEl.style.backgroundImage) {
      const match = imgEl.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)
      imageUrl = match ? match[1] : ''
    } else if (imgEl.src) {
      imageUrl = imgEl.src
    }
  }

  const selectedColor = document.querySelector('.product-color-option.border-black, .product-color-option[aria-pressed="true"]')
  if (selectedColor) {
    color = selectedColor.textContent?.trim() || null
  }

  return { title, price, imageUrl, productUrl, color }
}

const formatPrice = (price) => {
  const numPrice = typeof price === 'number' ? price : parseInt(price, 10)
  if (isNaN(numPrice)) return '0'
  return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const renderCartItems = () => {
  const cartProducts = document.getElementById('cart-products')
  if (!cartProducts) return

  cartProducts.innerHTML = ''

  if (cartItems.length === 0) {
    cartProducts.innerHTML = '<div class="text-center py-8 text-slate-500">Корзина пуста</div>'
    updateCartCounter()
    updateCartTotal()
    return
  }

  const template = document.getElementById('cart-product-template')
  if (!template) return
  
  cartItems.forEach((item, index) => {
    const clone = template.content.cloneNode(true)
    const product = clone.querySelector('.cart-product')
    const img = clone.querySelector('.cart-product-img')
    const link = clone.querySelector('.cart-product-link')
    const colorOption = clone.querySelector('.cart-product-option')
    const colorText = clone.querySelector('.cart-product-color')
    const quantity = clone.querySelector('.cart-product-quantity')
    const price = clone.querySelector('.cart-price')
    const minusBtn = clone.querySelector('.cart-product-minus')
    const plusBtn = clone.querySelector('.cart-product-plus')
    const deleteBtn = clone.querySelector('.cart-product-delete')
    
    product.setAttribute('data-cart-product-i', index)
    img.style.backgroundImage = `url('${item.imageUrl}')`
    link.href = item.productUrl
    link.textContent = item.title
    quantity.textContent = item.quantity
    price.textContent = formatPrice(item.price * item.quantity)
    
    if (item.color) {
      colorOption.style.display = 'block'
      colorText.textContent = `Цвет: ${item.color}`
    }
    
    minusBtn.setAttribute('data-product-index', index)
    plusBtn.setAttribute('data-product-index', index)
    deleteBtn.setAttribute('data-product-index', index)
    
    cartProducts.appendChild(clone)
  })

  attachCartItemHandlers()
  updateCartCounter()
  updateCartTotal()
}

const attachCartItemHandlers = () => {
  const minusButtons = document.querySelectorAll('.cart-product-minus')
  const plusButtons = document.querySelectorAll('.cart-product-plus')
  const deleteButtons = document.querySelectorAll('.cart-product-delete')

  minusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      if (cartItems[index] && cartItems[index].quantity > 1) {
        cartItems[index].quantity--
        renderCartItems()
      }
    })
  })

  plusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      if (cartItems[index]) {
        cartItems[index].quantity++
        renderCartItems()
      }
    })
  })

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      cartItems.splice(index, 1)
      renderCartItems()
    })
  })
}

const updateCartCounter = () => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const counter = document.getElementById('cart-counter')
  const cartIconWrapper = document.getElementById('cart-icon-wrapper')
  
  if (totalQuantity > 0) {
    if (counter) {
      counter.textContent = totalQuantity
    }
    if (cartIconWrapper) {
      cartIconWrapper.classList.remove('hidden')
      cartIconWrapper.classList.add('flex')
    }
  } else {
    if (cartIconWrapper) {
      cartIconWrapper.classList.add('hidden')
      cartIconWrapper.classList.remove('flex')
    }
  }
}

const updateCartTotal = () => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const prodAmountPrice = document.querySelector('.cart-subtotal-amount .cart-price')
  const totalAmountPrice = document.querySelector('.cart-total-amount .cart-price')
  
  if (prodAmountPrice) {
    prodAmountPrice.textContent = formatPrice(total)
  }
  
  if (totalAmountPrice) {
    totalAmountPrice.textContent = formatPrice(total)
  }
}

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn')

addToCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    
    const productData = getProductData(button)
    if (!productData || !productData.title || !productData.price) {
      return
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.title === productData.title && 
                item.productUrl === productData.productUrl &&
                item.color === productData.color
    )

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++
    } else {
      cartItems.push({
        ...productData,
        quantity: 1
      })
    }

    renderCartItems()
    openCart()
  })
})

const colorOptions = document.querySelectorAll('.product-color-option')

if (colorOptions.length > 0) {
  colorOptions[0].classList.add('border-black')
  colorOptions[0].setAttribute('aria-pressed', 'true')
  
  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      colorOptions.forEach((opt) => {
        opt.classList.remove('border-black')
        opt.setAttribute('aria-pressed', 'false')
      })
      option.classList.add('border-black')
      option.setAttribute('aria-pressed', 'true')
    })
  })
}

const productTabsButton = document.querySelector('.product-tabs-button')
const productTabsSection = document.getElementById('product-about-section')

if (productTabsButton && productTabsSection) {
  productTabsButton.addEventListener('click', () => {
    const isOpened = productTabsSection.style.display === 'block'
    productTabsSection.style.display = isOpened ? 'none' : 'block'
    const closeIcon = productTabsButton.querySelector('.product-tabs-close')
    if (closeIcon) {
      if (!isOpened) {
        closeIcon.classList.add('rotate-45')
      } else {
        closeIcon.classList.remove('rotate-45')
      }
    }
  })
}

const catalogCardImgs = document.querySelectorAll('.catalog-card-img[data-hover-image]')

catalogCardImgs.forEach((imgElement) => {
  const originalImage = imgElement.style.backgroundImage
  const hoverImage = imgElement.getAttribute('data-hover-image')

  if (hoverImage) {
    imgElement.addEventListener('mouseenter', () => {
      imgElement.style.backgroundImage = hoverImage
    })

    imgElement.addEventListener('mouseleave', () => {
      imgElement.style.backgroundImage = originalImage
    })
  }
})

renderCartItems()

const openCheckout = () => {
  const checkoutPage = document.getElementById('cart-checkout-page')
  if (!checkoutPage) return
  
  closeCart()
  renderCheckoutItems()
  updateCheckoutTotals()
  
  checkoutPage.classList.remove('hidden', 'opacity-0')
  checkoutPage.classList.add('block', 'opacity-100', 'cart-checkout-page--shown')
  document.body.style.overflow = 'hidden'
}

const closeCheckout = () => {
  const checkoutPage = document.getElementById('cart-checkout-page')
  if (!checkoutPage) return
  
  checkoutPage.classList.add('hidden', 'opacity-0')
  checkoutPage.classList.remove('block', 'opacity-100', 'cart-checkout-page--shown')
  document.body.style.overflow = ''
}

const renderCheckoutItems = () => {
  const checkoutProducts = document.getElementById('checkout-products')
  if (!checkoutProducts) return
  
  checkoutProducts.innerHTML = ''
  
  if (cartItems.length === 0) {
    checkoutProducts.innerHTML = '<div class="text-center py-8 text-slate-500">Корзина пуста</div>'
    updateCheckoutTotals()
    return
  }
  
  const template = document.getElementById('checkout-product-template')
  if (!template) return
  
  cartItems.forEach((item, index) => {
    const clone = template.content.cloneNode(true)
    const product = clone.querySelector('.cart-product')
    const img = clone.querySelector('.cart-product-img')
    const link = clone.querySelector('.cart-product-link')
    const colorOption = clone.querySelector('.cart-product-option')
    const colorText = clone.querySelector('.cart-product-color')
    const quantity = clone.querySelector('.cart-product-quantity')
    const price = clone.querySelector('.cart-price')
    const minusBtn = clone.querySelector('.cart-product-minus')
    const plusBtn = clone.querySelector('.cart-product-plus')
    const deleteBtn = clone.querySelector('.cart-product-delete')
    
    product.setAttribute('data-cart-product-i', index)
    img.style.backgroundImage = `url('${item.imageUrl}')`
    link.href = item.productUrl
    link.textContent = item.title
    quantity.textContent = item.quantity
    price.textContent = formatPrice(item.price * item.quantity)
    
    if (item.color) {
      colorOption.style.display = 'block'
      colorText.textContent = `Цвет: ${item.color}`
    }
    
    minusBtn.setAttribute('data-product-index', index)
    plusBtn.setAttribute('data-product-index', index)
    deleteBtn.setAttribute('data-product-index', index)
    
    checkoutProducts.appendChild(clone)
  })
  
  attachCheckoutItemHandlers()
  updateCheckoutTotals()
}

const attachCheckoutItemHandlers = () => {
  const minusButtons = document.querySelectorAll('#checkout-products .cart-product-minus')
  const plusButtons = document.querySelectorAll('#checkout-products .cart-product-plus')
  const deleteButtons = document.querySelectorAll('#checkout-products .cart-product-delete')

  minusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      if (cartItems[index] && cartItems[index].quantity > 1) {
        cartItems[index].quantity--
        renderCheckoutItems()
        renderCartItems()
      }
    })
  })

  plusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      if (cartItems[index]) {
        cartItems[index].quantity++
        renderCheckoutItems()
        renderCartItems()
      }
    })
  })

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-product-index'), 10)
      cartItems.splice(index, 1)
      renderCheckoutItems()
      renderCartItems()
    })
  })
}

const updateCheckoutTotals = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const subtotalEl = document.getElementById('checkout-subtotal')
  const discountEl = document.getElementById('checkout-discount-amount')
  const discountBlock = document.getElementById('checkout-discounts')
  const totalEl = document.getElementById('checkout-total')
  
  const discount = Math.round(subtotal * 0.07)
  const total = subtotal - discount
  
  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(subtotal)
  }
  
  if (discountEl) {
    discountEl.textContent = formatPrice(discount)
  }
  
  if (discountBlock) {
    discountBlock.style.display = discount > 0 ? 'flex' : 'none'
  }
  
  if (totalEl) {
    totalEl.textContent = formatPrice(total)
  }
}

const checkoutButton = document.querySelector('.cart-continue-btn')
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
      openCheckout()
    }
  })
}

const checkoutBackBtn = document.getElementById('checkout-back')
const checkoutCloseBtn = document.getElementById('checkout-close')

if (checkoutBackBtn) {
  checkoutBackBtn.addEventListener('click', () => {
    closeCheckout()
    openCart()
  })
}

if (checkoutCloseBtn) {
  checkoutCloseBtn.addEventListener('click', () => {
    closeCheckout()
  })
}

const checkoutForm = document.getElementById('checkout-form')
  if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Форма отправлена! (Это демо-версия)')
  })
}

const originalRenderCartItems = renderCartItems
renderCartItems = function() {
  originalRenderCartItems()
  const checkoutPage = document.getElementById('cart-checkout-page')
  if (checkoutPage && checkoutPage.classList.contains('cart-checkout-page--shown')) {
    renderCheckoutItems()
    updateCheckoutTotals()
  }
}

// Кнопка "наверх" - инициализация после полной загрузки
const initBackToTopButton = () => {
  const backToTopButton = document.getElementById('back-to-top')
  
  if (!backToTopButton) {
    // Если кнопка не найдена, попробуем ещё раз через небольшую задержку
    setTimeout(initBackToTopButton, 100)
    return
  }
  
  // Убеждаемся, что кнопка видима
  backToTopButton.style.display = 'flex'
  backToTopButton.style.position = 'fixed'
  backToTopButton.style.zIndex = '9999'
  
  // Показывать/скрывать кнопку при прокрутке
  const toggleBackToTop = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0
    
    if (scrollTop > 100) {
      backToTopButton.style.opacity = '1'
      backToTopButton.style.pointerEvents = 'auto'
    } else {
      backToTopButton.style.opacity = '0'
      backToTopButton.style.pointerEvents = 'none'
    }
  }

  // Изначально скрываем
  backToTopButton.style.opacity = '0'
  backToTopButton.style.pointerEvents = 'none'
  
  // Проверяем сразу и при загрузке
  toggleBackToTop()
  
  // Слушаем события прокрутки
  window.addEventListener('scroll', toggleBackToTop, { passive: true })
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault()
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

// Запускаем инициализацию
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initBackToTopButton, 1)
  } else {
    window.addEventListener('load', initBackToTopButton)
    document.addEventListener('DOMContentLoaded', initBackToTopButton)
  }

const deliveryPaymentTabs = document.querySelectorAll('.delivery-payment-tab')
const deliveryContent = document.getElementById('delivery-content')
const paymentContent = document.getElementById('payment-content')

if (deliveryPaymentTabs.length && deliveryContent && paymentContent) {
  deliveryPaymentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.getAttribute('data-tab')
      
      deliveryPaymentTabs.forEach(t => {
        t.classList.remove('active', 'border-black')
        t.classList.add('border-transparent')
      })
      
      tab.classList.add('active', 'border-black')
      tab.classList.remove('border-transparent')
      
      if (tabType === 'delivery') {
        deliveryContent.classList.remove('hidden')
        paymentContent.classList.add('hidden')
      } else if (tabType === 'payment') {
        deliveryContent.classList.add('hidden')
        paymentContent.classList.remove('hidden')
      }
    })
  })
}
