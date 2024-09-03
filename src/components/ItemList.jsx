import React, { useState, useMemo } from 'react';
import { useItemContext } from '../context/ItemContext';

const ItemList = () => {
    const { itemList } = useItemContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState(null);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(itemList.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const sortedItems = useMemo(() => {
        let items = [...itemList];

        if (sortCriteria) {
            
            const { key, order } = sortCriteria;
            items.sort((a, b) => {
                
                if (order === 'desc') {
                    return (b[key] > a[key]) ? 1 : (b[key] < a[key]) ? -1 : 0;
                } else {
                    return (a[key] > b[key]) ? 1 : (a[key] < b[key]) ? -1 : 0;
                }
            });
        }

        return items;
    }, [itemList, sortCriteria]);

    const currentItems = sortedItems.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSort = (key) => {
        setSortCriteria(prevCriteria => {
            if (prevCriteria && prevCriteria.key === key) {
                return { key, order: prevCriteria.order === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, order: 'desc' };
            }
        });
    };

    return (
        <div className="card itemlist">
            <div className="card-body">
                <h3 className='table-heading'>Item List</h3>

                <div className="sort-buttons">
                    <button onClick={() => handleSort('quantity')}>Sort by Quantity</button>
                    <button onClick={() => handleSort('price')}>Sort by Price</button>
                    <button onClick={() => handleSort('date')}>Sort by Date</button>
                </div>

                <table className="table pt-5">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.length === 0 ? (
                            <tr><td colSpan="6">No data Found</td></tr>
                        ) : (
                            currentItems.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/${item.image}`} 
                                            alt={item.title} 
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                    aria-current={currentPage === index + 1 ? 'page' : undefined}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    );
};

export default ItemList;
