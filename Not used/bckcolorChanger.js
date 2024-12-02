const [red, green, blue] = [0, 75, 173]  // declare 3 variable med 3 værdier
const background = document.querySelector('.colorChange')

window.addEventListener('scroll', () => { // når eventen 'scroll' sker, gør det her
  let y = 1 + (window.scrollY || window.pageYOffset) / 450   // window.pageYOffset er til ældre browsere. Lad y være enten window.scrollY eller window.pageYOffset. +1 i begyndelsen så man ikke starter på 0
  y = y < 1 ? 1 : y // Sørger for at y aldrig er mindre end 1, hvis man dividere med mindre end 1 bliver går farverne værdierne op. (browsere med elastic scroll såsom safari kan scrolle længere op end siden)
  const [r, g, b] = [red/y, green/y, blue/y].map(Math.round) //.map sætter Math.round på alle elementer af arrayet, så der kun kommer hele værdier, som css vil have
  background.style.backgroundColor = `rgb(${r}, ${g}, ${b})`  // Sætter baggrundens farve til r, g, b værdierne
})

// Linje 6 er en if else statement
// condition ? valueIfTrue : valueIfFalse
// Hvis y < 1 så y = 1, hvis ikke så y = y