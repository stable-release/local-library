function findAuthorById(authors, id) {
  return authors.find(author => author.id == id);
}

function findBookById(books, id) {
  return books.find(book => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(book => book.borrows[0].returned == false);
  const returned = books.filter(book => book.borrows[0].returned == true);
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const history = accounts.reduce((result, account) => {
    if (borrows.some(borrow => accountInBorrows(borrow, account))) {
      result.push({
        ...account,
        returned: (borrows.find(borrow => accountInBorrows(borrow, account)).returned)
      });
    }
    return result;
  }, []);
  return history.slice(0, 10);
}

function accountInBorrows(borrow, account) {
	return borrow.id == account.id;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
