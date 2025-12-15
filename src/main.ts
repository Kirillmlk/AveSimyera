import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-8">
    <div class="space-y-4 text-center">
      <p class="text-sm uppercase tracking-[0.25em] text-slate-400">Tailwind + Vite</p>
      <h1 class="text-4xl font-bold">Hello Tailwind</h1>
      <p class="text-lg text-slate-300 max-w-xl">
        Если видишь тёмный фон и белый текст — Tailwind подключён и работает.
      </p>
      <div class="flex items-center justify-center gap-3 text-sm text-slate-400">
        <span class="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700">bg-slate-900</span>
        <span class="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700">text-slate-100</span>
        <span class="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700">flex</span>
      </div>
    </div>
  </main>
`
