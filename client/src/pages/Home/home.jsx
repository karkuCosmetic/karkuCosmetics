import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/Controllers/productController";

export const Home = () => {
  const dispatch = useDispatch();
  
useEffect(()=>{
  dispatch(getProduct());
},[dispatch])

  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;
