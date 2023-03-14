function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    if (!book.borrows[0].returned) total++;
    return total;
  }, 0);
}

function getMostCommonGenres(books) {
  return books.reduce((result, book) => {
    const entry = result.find(({ name }) => name == book.genre);
    if (!entry) {
      return [...result, { name: book.genre, count: 1 }];
    }
    return [...result, entry.count++];
  }, []).sort((prevEntry, nextEntry) => nextEntry.count - prevEntry.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  const mostPopular = books.map((book) => ({ name: book.title, count: book.borrows.length }));
  return mostPopular.sort((prevBook, nextBook) => nextBook.count - prevBook.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const mostPopular = books.reduce((mostPopular, book) => {
    const author = authors.find((author) => author.id == book.authorId);
    const fullName = `${author.name.first} ${author.name.last}`;
    const entry = mostPopular.find(({ name }) => name == fullName);
    const borrows = book.borrows.length;
    if (!entry) {
      mostPopular.push({ name: fullName, count: borrows });
      return mostPopular;
    }
    entry.count += borrows;
    return mostPopular;
  }, []);
  return mostPopular.sort((prevBook, nextBook) => nextBook.count - prevBook.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
