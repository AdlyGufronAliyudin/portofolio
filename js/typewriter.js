class Typewriter {
  constructor(el, words, period) {
    this.el = el;
    this.words = words;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.index = 0;
    this.isDeleting = false;
    this.init();
  }

  // Helper untuk membuat jeda waktu (replace setTimeout yang bertumpuk)
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async init() {
    const i = this.index % this.words.length;
    const fullTxt = this.words[i];

    // Logika menambah atau menghapus karakter
    this.txt = this.isDeleting 
      ? fullTxt.substring(0, this.txt.length - 1) 
      : fullTxt.substring(0, this.txt.length + 1);

    // Update konten HTML
    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    // Kalkulasi kecepatan (delta)
    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period; // Berhenti sebentar setelah kata selesai diketik
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.index++;
      delta = 500; // Jeda sebelum mulai mengetik kata baru
    }

    await this.wait(delta);
    this.init(); // Rekursif yang bersih
  }
}

// Menjalankan dengan selektor yang lebih modern
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.type-writer');
  elements.forEach(el => {
    const words = JSON.parse(el.getAttribute('data-type'));
    const period = el.getAttribute('data-period');
    new Typewriter(el, words, period);
  });
});
