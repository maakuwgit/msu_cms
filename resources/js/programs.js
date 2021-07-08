//Look at the list of Programs, and add classes to any Map components
export const checkPrograms = (country) => {
  return country.programs.length > 0 ? ' programs' : ''
}