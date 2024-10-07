// date_format_utils.js 

function formatDate(date) {
  // Array of day names
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Array of month names
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get the day of the week
  const dayOfWeek = days[date.getDay()];
  
  // Get the month
  const month = months[date.getMonth()];
  
  // Get the day of the month
  const dayOfMonth = date.getDate();
  
  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  // Construct the formatted string
  return `${dayOfWeek}, ${month} ${dayOfMonth} at ${hours}:${minutes} ${ampm}`;
}

module.exports = formatDate;
