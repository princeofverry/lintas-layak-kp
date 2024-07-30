const generateUniqueCode = () => {
  const now = new Date();
  const dayNames = ['G', 'A', 'B', 'C', 'D', 'E', 'F'];
  const day = dayNames[now.getDay()];
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return `${day}${hour}${minute}${second}`;
};

module.exports = { generateUniqueCode };
