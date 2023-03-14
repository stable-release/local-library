function findAccountById(accounts, id) {
	return accounts.find((account) => account.id == id);
}

function sortAccountsByLastName(accounts) {
	return accounts.sort((prev, next) =>
		prev.name.last.toLowerCase() > next.name.last.toLowerCase() ? 1 : -1
	);
}

function getTotalNumberOfBorrows(account, books) {
	return books.reduce((result, book) => {
		for (let borrow in book.borrows) {
			if (accountInBorrows(book.borrows[borrow], account)) result++;
		}
		return result;
	}, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
	const checkedOut = books.reduce((result, book) => {
		if (book.borrows.some(borrow => (accountInBorrows(borrow, account) && borrow.returned == false))) {
			result.push({
				...book,
				author: authors.find(author => author.id == book.authorId)
			});
		}
		return result;
	}, []);
	return checkedOut;
}

function accountInBorrows(borrow, account) {
	return borrow.id == account.id;
}

module.exports = {
	findAccountById,
	sortAccountsByLastName,
	getTotalNumberOfBorrows,
	getBooksPossessedByAccount,
};
