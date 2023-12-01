const getDateInFuture = (minutes) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + minutes * 60000);

  return futureDate.toISOString();
}

module.exports = getDateInFuture