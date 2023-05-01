const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_ORDER_TYPE = "eventId";

function getPagination(query) {
  let order;

  if (query.type === "latest") {
    order = "-eventId";
  }

  const type = order || DEFAULT_PAGE_ORDER_TYPE;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;

  return {
    type,
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
