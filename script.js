// 1. Magic Hover Effect (Sichqonchani orqasidan ergashadigan yorug'lik)
const cards = document.querySelectorAll('.magic-hover-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Custom properties ga x va y ni uzatamiz
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 2. Meteor Effect (Meteoritlar yog'ilishi)
const meteorContainer = document.getElementById('meteors-container');

function createMeteor() {
    if (!meteorContainer) return;
    
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    // Tasodifiy boshlanish nuqtasi (x) va balandlik (y)
    meteor.style.left = `${Math.random() * 100}vw`; // Ekran boshidan
    meteor.style.top = `${Math.random() * 80}vh`; // Ekran yuzasidan
    
    // Tasodifiy davomiylik (tezlik)
    const duration = 2 + Math.random() * 3; // 2 dan 5 soniyagacha
    meteor.style.animationDuration = `${duration}s`;
    
    // Pastga qarab tushish burchagi (dioganal -20 dan 45 gacha)
    const angle = 20 + Math.random() * 25; 
    meteor.style.transform = `rotate(${angle}deg)`;
    
    meteorContainer.appendChild(meteor);
    
    // Effektdan so'ng DOM ni tozalash
    setTimeout(() => {
        meteor.remove();
    }, duration * 1000);
}

// Har 800 - 1500 ms ichida bitta meteor yaratiladi
setInterval(createMeteor, 1200);

// Boshlang'ich animatsiya uchu 3 ta meteorit darhol yaratiladi
for(let i=0; i<3; i++) {
    setTimeout(createMeteor, Math.random() * 1000);
}
