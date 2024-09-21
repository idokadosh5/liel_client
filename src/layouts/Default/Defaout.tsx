import { Route, Routes } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Default.css'
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import NotFound from '../../pages/NotFound/NotFound'
import SignUp from '../../pages/SignUp/SignUp'
import SignIn from '../../pages/SignIn/SignIn'
import CardPage from '../../pages/CardPage/CardPage'
import AdminUser from '../../pages/AdminUser/AdminUser'
import AllMeals from '../../pages/AllMeals/AllMeals'
import CreateCard from '../../pages/CreateCard/CreateCard'
import UpdateCard from '../../pages/UpdateCard/UpdateCard'
import Italian from '../../pages/Italian/Italian'
import American from '../../pages/American/American'
import Asian from '../../pages/Asian/Asian'
import Vegeterian from '../../pages/Vegeterian/Vegeterian'
import CategoriesNav from '../../components/CategoriesNav/CategoriesNav'
import Cart from '../../pages/Cart/Cart'
import DeleteMeal from '../../pages/DeleteMeal/DeleteMeal'
import UpdateScreen from '../../pages/UpdateScrean/UpdateScreen'




export default function Defaout() {
  return (
    <div className='Default'>
        <Header></Header>
        <CategoriesNav/>
        <Routes>
            <Route path='/Home' element={<Home/>}/>
            <Route path='About' element={<About/>}/>
            <Route path='Signup' element={<SignUp/>}/>
            <Route path='SignIn' element={<SignIn/>}/>
            <Route path='/CardPage/:cardId' element={<CardPage/>}/>
            <Route path='AdminUser' element={<AdminUser/>}/>
            <Route path='AllMeals' element={<AllMeals/>}/>
            <Route path='CreateCard' element={<CreateCard name={''} description={''} type={''} price={''} image={{
          url: '',
          alt: ''
        }} />}/>
            <Route path='DeleteMeal' element={<DeleteMeal/>}/>
            <Route path='UpdateScrean' element={<UpdateScreen/>}/>
            <Route path='UpdateCard/:cardId' element={<UpdateCard name={''} description={''} type={''} price={''} image={{
          url: '',
          alt: ''
        }}/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='Italian' element={<Italian/>}/>
            <Route path='American' element={<American/>}/>
            <Route path='Asian' element={<Asian/>}/>
            <Route path='Vegeterian' element={<Vegeterian/>}/>
            <Route path='Cart' element={<Cart/>}/>
        </Routes>
        <Footer></Footer>
    </div>
  )
}
