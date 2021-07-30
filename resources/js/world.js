export const toggleContinents = (status='on', current=false) => {
  let continents = document.querySelectorAll('[data-continent]')
  if(current) {
    continents.forEach(c => {
      if(c !== current ){
        status === 'off' ? c.classList.add('disabled') : c.classList.remove('disabled')
        c.classList.remove('selected')
      }
    })
  }else{
    continents.forEach(c => {
      c.classList.remove('selected','disabled')
    })
  }
}

export const toggleCountries = (status='on', current=false) => {
  let countries = document.querySelectorAll('[data-country]')
  if(current) {
    countries.forEach(c => {
      if(c !== current ) {
        c.classList.remove('selected')
      }
    })
  }else{
    countries.forEach(c => {
      c.classList.remove('selected')
    })
  }
}

export const zoomMap = (scale,originX,originY) => {
  let map = document.querySelector('[data-map]')
  if(scale){
    map.style.transform = `scale(${scale}) translate(${originX}%, ${originY}%)`
  }else{
    map.style = ''
  }
}