import { useEffect, useState } from "react";

const PreviewSales=({setSection})=>{

    const [sales, setSales] = useState ([]);

    useEffect (() => {
  //me falta el back y front de pedidos
    }, []);
  

    return(
        <div>
            <p>PreviewSales</p>
            <button onClick={()=>setSection("Sales")}>Sales</button>
        </div>
    )
}
export default PreviewSales;