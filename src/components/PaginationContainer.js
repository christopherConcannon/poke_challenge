import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import usePagination from '../hooks/usePagination'

const PaginationContainer = ({ data, RenderComponent, dataLimit, pageLimit }) => {

  const { currentPage, goToPrevPage, goToNextPage, changePage, getPagesData, getPaginationGroup } = usePagination(data, dataLimit, pageLimit)

	const pages = Math.ceil(data.length / dataLimit)

	return (
		<div className='table-container'>
			<RenderComponent pokemons={data} getPages={getPagesData} />

			<div className='pagination'>
				<button className={`prev ${currentPage === 1 && 'disabled'}`} onClick={goToPrevPage}>
					prev
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
					next
				</button>
			</div>
		</div>
	)
}

export default PaginationContainer
