export const getPaths = () => {
  return window.location.pathname.split('/').map(path => path)
}

//Change the class on the Body tag so that it matches the current page(s),
//also added classes for "animating" (when in motion) and "loaded" on first paint
//@style: <String> any css class you'd like to ensure gets added
export const updateBodyStyle = (style='') => {
  let body = document.querySelector('body')
  let location = style ? style : ''
  let has_loaded = body.classList.contains('loaded') ? false : true

  //let paths = window.location.pathname.split('/')
  getPaths().forEach(path => {
    if( path !== '' ) {
      if( location.search(path) < 0 ) location += ' ' + path
    }
  })

  //If we've already loaded, don't stagger animate things in
  if(has_loaded) {
    setTimeout(()=>{
      if( location.search('loaded') < 0 ) location = `${location ? `${location} loaded` : 'loaded'}`
      body.className = location
    },500)
  }else{
    setTimeout(()=>{
      if( location.search('animating') >= 0 ) body.classList.remove('animating')
    },5)
    //First, set loaded and location
    if( location.search('loaded') < 0 ) location = `${location ? `${location} loaded animating` : 'loaded animating'}`
  }
  body.className = location
}

//Create a numerical suffix that is (mostly) random, once combinded with other string data
export const randomID = (length=8) => {
  // Declare all characters
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str
}

//Trigger the closing of a Bootstrap modal
export const closeModal = (callback) => {
  let closer = document.querySelector('[data-dismiss="modal"]')
  if(closer) closer.click()
  if(callback) callback()
}

//After a specified time, close the warning/error alert aside
export const timedAlert = (callback = false, time = 3600) => {
  var alerts = document.querySelector('[data-error]')

  function animateOut(callback) { 
    callback && callback()
    alerts.classList.remove('show')
  }

  if(alerts){
    //Reset the animator and the alert aside
    alerts.classList.add('show')

    if(callback){
      setTimeout(() => animateOut(callback), time)
    }else{
      setTimeout(() => animateOut(), time)
    }
  }else{
    return {
      feedback: {
        msg: 'timedAlert called, but no alerts are avialable to close', 
        style: 'danger'
      }
    }
  }
}