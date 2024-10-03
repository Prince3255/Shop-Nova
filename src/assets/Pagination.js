export const Paginate = (items, currentPage) => {
    const postPerPage = 10;
    const lastIndex = currentPage * postPerPage
    const StartIndex = lastIndex - postPerPage;
    return items ? items.slice(StartIndex, lastIndex) : []
  }