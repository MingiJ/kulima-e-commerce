import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <nav class="navbar">
            <Link to="/" class="brand">
                <span class="">4</span>rm
            </Link>

            <div class="nav">
                <Link to="/" class="nav-link">
                    <i class="lni lni-home"></i>
                    <span>home</span>
                </Link>

                <Link to="/cart" class="nav-link">
                    <i class="lni lni-cart"></i>
                    <div class="cart-count">
                        <span>{cartItems.length}</span>
                    </div>
                    <span>cart</span>
                </Link>

                <div class="dropdown">
                    <Link to="/seller/:id" class="nav-link">
                        <i class="lni lni-customer"></i>
                        <span>seller</span>
                    </Link>
                    <div class="dropdown-content">
                        <Link to="/productlist/seller" class="link">products</Link>
                        <Link to="/orderlist/seller" class="link">orders</Link>
                    </div>
                </div>
                    
                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        
                        <Link to="#admin" class="nav-link mr-2">
                            <i class="lni lni-cogs"></i>
                            <span>admin</span>
                        </Link>

                        <ul className="dropdown-content">
                            <li>
                                <Link to="/dashboard" className='link'>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/productlist" className='link'>Products</Link>
                            </li>
                            <li>
                                <Link to="/orderlist" className='link'>Orders</Link>
                            </li>
                            <li>
                                <Link to="/userlist" className='link'>Users</Link>
                            </li>
                            
                        </ul>
                    </div>
            )}
                
            </div>

            {userInfo ? (
                <div class="dropdown">
                    <div class="user">
                        <img class="user-img" src="/assets/img/marcus.jpeg" alt=""/>
                        <i class="lni lni-chevron-right"></i>
                    </div>

                    <div class="dropdown-content">
                        <Link to="/profile" class="link">profile</Link>
                        <Link to="/orderhistory" class="link">orders</Link>
                        <Link to="#" class="link" onClick={signoutHandler}>logout</Link>
                    </div>
                </div>
            ):(
               <React.Fragment>
                   <Link to="/signin" class="btn">login</Link>
                   {/* <Link to="/register" class="btn">register</Link> */}
               </React.Fragment> 
            )}
        </nav>
    )
};

export default Navbar;
