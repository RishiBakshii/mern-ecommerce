import {BrowserRouter as Router,Routes,Route, Navigate} from  'react-router-dom'
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, HomePage, ProductDetailsPage, CartPage, UserProfilePage, CheckoutPage, OrderSuccessPage, UserOrdersPage, ProductUpdatePage, AddProductPage, AdminOrdersPage, WishlistPage, OtpVerificationPage} from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import {Protected} from './features/auth/components/Protected'
import { Logout } from './features/auth/components/Logout';
import { fetchLoggedInUserByIdAsync } from './features/user/UserSlice';
import { fetchAllBrandsAsync } from './features/brands/BrandSlice';
import { fetchAllCategoriesAsync } from './features/categories/CategoriesSlice';
import { fetchCartByUserIdAsync } from './features/cart/CartSlice';
import {fetchAddressByUserIdAsync} from './features/address/AddressSlice'
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import {fetchWishlistByUserIdAsync} from './features/wishlist/WishlistSlice'
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const dispatch=useDispatch()
  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(()=>{
    /* when a user is logged in then this dispatches an action to get all the details of loggedInUser, 
    as while login and signup only the bare-minimum information is sent by the server */
    if(loggedInUser?.isVerified){
      dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id))
      dispatch(fetchAllBrandsAsync())
      dispatch(fetchAllCategoriesAsync())

      if(!loggedInUser.isAdmin){
        dispatch(fetchCartByUserIdAsync(loggedInUser?._id))
        dispatch(fetchAddressByUserIdAsync(loggedInUser?._id))
        dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id))
      }
    }
  },[loggedInUser])

  return (
    <Router>

      {isAuthChecked && 

      <Routes>

        {/* public routes */}
        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route exact path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route exact path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>

        {
          loggedInUser?.isAdmin?(
            // admin routes
            <>
            <Route exact path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route exact path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
            <Route exact path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
            <Route exact path='/admin/orders' element={<Protected><AdminOrdersPage/></Protected>}/>
            <Route exact path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
            </>
          ):(
            // user routes
            <>
            <Route exact path='/' element={<Protected><HomePage/></Protected>}/>
            <Route exact path='/cart' element={<Protected><CartPage/></Protected>}/>
            <Route exact path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
            <Route exact path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
            <Route exact path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
            <Route exact path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
            <Route exact path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
            <Route exact path='*' element={<NotFoundPage/>}/>
            </>
          )
        }

        {/* common routes */}
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

      </Routes>
      }
    </Router>
  );
}

export default App;
