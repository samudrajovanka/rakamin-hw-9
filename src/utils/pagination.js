exports.getPaginationStatus = (page, limit, total) => {
  const totalPage = Math.ceil(total / limit);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  let prevPage = null;
  if (page > totalPage) {
    prevPage = totalPage;
  } else if (hasPrevPage) {
    prevPage = page - 1;
  }

  return {
    totalPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage,
    currentPage: page,
    limit,
  };
};
