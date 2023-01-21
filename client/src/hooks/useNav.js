import { useNavigate } from 'react-router-dom';


export const useNav = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");

  }

  const goDetails = (id) => {
    navigate(`/details/${id}`);
  }

  const redirectPage = (id) => {
    navigate(`/home/${id}`);
  }

  const goCart = () => {
    navigate(`/cart`);
  }

  const goBack = () => {
    navigate(-1);
  }


  return ({ goHome,goCart, goBack, goDetails, redirectPage })
}
