import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

export const UseHistory = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams()
  const handleClick = () => {
    history.replace('/about?a=1#123');
  }
  useEffect(() => {
    // console.log( location, '---' );
  }, [location]);

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  )
}