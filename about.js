// Scroll animation About section
const aboutSection=document.getElementById('about');
const featureCards=document.querySelectorAll('.feature-card');

function fadeInAbout(){
  const sectionPos=aboutSection.getBoundingClientRect().top;
  const screenPos=window.innerHeight/1.2;
  if(sectionPos<screenPos){
    aboutSection.style.opacity=1;
    aboutSection.style.transform="translateY(0)";
    featureCards.forEach((card,i)=>{
      setTimeout(()=>{card.classList.add('visible');}, i*200);
    });
  }
}
window.addEventListener('scroll',fadeInAbout);
window.addEventListener('load',fadeInAbout);

// Learn More Button
document.getElementById('learnMoreBtn').addEventListener('click',()=>{
  alert('Welcome to our Coffee Shop! Explore our menu and enjoy premium coffee.');
});