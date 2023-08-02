exports.getPaginationStatus = (page, limit, total) => {
  const totalPage = Math.ceil(total / limit);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  return {
    totalPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
    currentPage: page,
    limit,
  };
};
