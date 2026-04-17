const maskName = (name) => {
  if (!name) return 'Anonymous';
  const nameArray = name.split('');
  return nameArray
    .map((char, index) => {
      if (index === 0 || index === name.length - 1 || char === ' ') {
        return char;
      }
      return Math.random() > 0.5 ? '*' : char;
    })
    .join('');
};

module.exports = { maskName };
