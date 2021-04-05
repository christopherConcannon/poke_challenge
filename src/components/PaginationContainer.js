import React, { useEffect } from 'react'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import usePagination from '../hooks/usePagination'

const PaginationContainer = ({ data, RenderComponent, dataLimit, pageLimit }) => {
  const { currentPage, goToPrevPage, goToNextPage, changePage, getPagesData, getPaginationGroup } = usePagination(data, dataLimit, pageLimit)

	const pages = Math.ceil(data.length / dataLimit)

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [currentPage])

	return (
		<div className='table-container'>
			<RenderComponent pokemons={data} getPages={getPagesData} />

			<div className='pagination'>
				<button className={`prev ${currentPage === 1 && 'disabled'}`} onClick={goToPrevPage}>
					<ChevronLeftIcon fontSize="small" />
				</button>
				{getPaginationGroup().map((page) => (
					<button
						key={page}
						onClick={changePage}
						className={`pagination-item ${currentPage === page && 'active'}`}
					>
						{page}
					</button>
				))}
				<button
					className={`next ${currentPage === pages && 'disabled'}`}
					onClick={goToNextPage}
				>
					<ChevronRightIcon fontSize="small" />
				</button>
			</div>
		</div>
	)
}

export default PaginationContainer
