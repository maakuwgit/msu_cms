import api from './api'

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

//[Unused] Send data about the 'section' a user is interacting with to the backend
export const trackIt = (data, section) => {
  //console.log(`insert tracking for ${data}`, section)
}

//Take a standard string of numbers and format it to look like a phone number
export const formatPhone = (phone) => {
  return `(${phone.substr(0,3)}) ${phone.substr(3,3)}-${phone.substr(6)}`
}

//Force the window contents to hard jump tot he top
export const jumpToTop = () => {
  setTimeout(window.scrollTo(0, 0), 300)
}

//Read the location hash (if there is one) and trigger that tab
export const getHash = () => {
  let hash = window.location.hash
  if(hash) {
    let anchor = document.querySelector(`a[href="${hash}"]`)
    if( anchor ) {
      anchor.click()
    }
  }else{
    return false
  }
}

export const setHash = (event) => {
  let hash = event.target.dataset.href
  window.location = hash
}

//Convert any DOM object containing an anchor into a clickable element
export const clickthrough = (event) => {
  if(!event) return false
  event.preventDefault()
    
  const target = event.target.querySelector('a:first-of-type')
  if(target) {
    if(!target.classList.contains('disabled')) target.click()
  }
}

//Trigger the closing of a Bootstrap modal
export const closeModal = (callback) => {
  let closer = document.querySelector('[data-dismiss="modal"]')
  if(closer) closer.click()
  if(callback) callback()
}

export const getCookie = (cname) => {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export const getLogo = (callback) => {
  api.get('/assets/logos/1')
  .then( response => {
    callback && callback(response.data)
  })
  .finally( () => {
    return true
  })
  .catch( error => {
    return `Settings error occurred: ${error}`
  })
}

export const getSettings = (callback) => {
  axios.get('/resource/settings')
  .then( response => {
    callback && callback(response.data)
  })
  .finally( () => {
    return true
  })
  .catch(error => {
    return error.response ? error.response.statusText : error
  })
}

export const getUsers = (callback) => {
  axios.get('/resource/users')
  .then( response => {
    callback && callback(response.data)
  })
  .finally( () => {
    return true
  })
  .catch(error => {
    return error.data
  })
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

//Order an array of objects by a specific key
export const dynamicSort = (property) => {
  let sortOrder = 1

  if(property[0] === "-") {
    sortOrder = -1
    property = property.substr(1)
  }

  return function (a,b) {
    if(sortOrder === -1){
        return b[property].localeCompare(a[property])
    }else{
        return a[property].localeCompare(b[property])
    }        
  }
}

//Convert date formats to something readable
export const standardizeDate = (date, use_time=false) => {
  let months = [`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`]
  let formatted = new Date(date)
  let month = formatted.getMonth()
  let day = formatted.getDate()
  let suffix = formatted.getHours() > 12 ? 'PM' : 'AM'
  let hour = formatted.getHours() > 12 ? formatted.getHours() - 12 : formatted.getHours()
  let year = formatted.getFullYear()
  let time = use_time ? ` ${hour}:${formatted.getMinutes()}${suffix}` : ''
  let fulldate = use_time ? `${month}/${day}/${year}${time}` : `${months[month]}. ${day}, ${year}`
  return fulldate
}

//Sort a set of alphanumeric strings
export const sortAlpha = (a, b) => {
  if (a === undefined || a === null) {
      return -1
  }
  if (b === undefined || b === null) {
      return 1
  }
  return a.localeCompare(b)
}

//Sort a set of numbers
export const sortNums = (a, b) => {
  if (a === null || b === null) {
      return 1
  }
  if (a > b ) { 
      return 1
  } else if (b > a ) {
      return -1
  } else {
      return 0
  }
}

  //Sort a set of dates
export const sortDate = (a, b) => {
  return a - b
}

//Sort a set of boolean vales
export const sortBool = (a, b) => {
  if (a === b) {
      return 0
  } else if (a === true) {
      return -1
  } else {
      return 1
  }
}

export const checkEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}