import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import httpRequest from '../utils/httpRequest';
import { reducer } from '../reducer/reducer';
import logger from 'use-reducer-logger';
import data from '../data';
function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(
        logger(reducer),
        {
            products: [],
            loading: true,
            error: '',
        }
    );
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await httpRequest.get('/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {loading ? (
                    <div>Loading....</div>
                ) : error ? (
                    <div>Error</div>
                ) : (
                    products.map((product) => (
                        <div className="product" key={product.slug}>
                            <Link to={`/product/${product.slug}`}>
                                <img src={product.image} alt={product.name} />
                            </Link>
                            <div className="product-info">
                                <Link to={`/product/${product.slug}`}>
                                    <p>{product.name}</p>
                                </Link>

                                <p>
                                    <strong>${product.price}</strong>
                                </p>
                                <button>Add to cart</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomeScreen;
