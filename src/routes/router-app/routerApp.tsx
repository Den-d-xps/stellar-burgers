import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  ForgotPassword
} from '@pages';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { App } from '../../components/app/app';
import { ProtectedRoute } from '@routes';

export const RouterApp = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Основные страницы */}
      <Routes location={state?.background || location}>
        <Route path='/' element={<App />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route element={<ProtectedRoute isPublic />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute isPublic={false} />}>
            <Route path='profile' element={<Profile />} />
            <Route path='profile/orders' element={<ProfileOrders />} />
            <Route path='profile/orders/:number' element={<OrderInfo />} />
          </Route>
          <Route path='feed/:number' element={<OrderInfo />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {/* Модалки */}
      {state?.background && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleGoBack}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleGoBack}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleGoBack}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
