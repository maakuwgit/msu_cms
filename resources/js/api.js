import axios from 'axios'
import cms from './cms.json'

export const devURL = `//127.0.0.1:8000`
export const prodURL = window.location.host
export const baseURL = cms.settings.is_dev ? devURL : prodURL

export default axios.create({
  baseURL: baseURL
})