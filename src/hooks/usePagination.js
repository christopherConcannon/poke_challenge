import { useState } from 'react'

const usePagination = (data = [], dataLimit, pageLimit  ) => {
  const [ currentPage, setCurrentPage ] = useState(1)

  // decrement currentPage
	const goToPrevPage = () => {
		setCurrentPage((prev) => prev - 1)
	}
	// increment currentPage
	const goToNextPage = () => {
		setCurrentPage((prev) => prev + 1)
	}
	// change currentPage
	const changePage = (e) => {
    const pageNumber = +e.target.innerText
		setCurrentPage(pageNumber)
	}
	// return sub array of results
	const getPagesData = () => {
		const startIdx = currentPage * dataLimit - dataLimit
		const lastIdx = startIdx + dataLimit
		return data.slice(startIdx, lastIdx)
	}

	const getPaginationGroup = () => {
		const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1
		// return new Array(pageLimit).fill().map((_, idx) => start + idx)
		return [...new Array(pageLimit)].map((_, idx) => start + idx)
  }

  return { currentPage, goToPrevPage, goToNextPage, changePage, getPagesData, getPaginationGroup }
}

export default usePagination