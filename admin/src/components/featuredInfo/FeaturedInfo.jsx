import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";


export default function FeaturedInfo() {

  const [income,setIncome] = useState([]);
  const [perc,setPerc] = useState([]);
  

  useEffect(() => {
    const getIncome = async() =>{
      try {
        const res = await userRequest.get("orders/income")
        setIncome(res.data);
        setPerc(((res.data[1].total-res.data[0].total)/res.data[1].total)*100);
      } catch (error) {
        console.log(error)
      }
    }
    getIncome();
  },[])

console.log(income);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total ? income[1]?.total:"0"}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}
            {perc<0 ? (
              <ArrowDownward  className="featuredIcon negative"/>
              ):<ArrowUpward className="featuredIcon"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${parseInt(income[1]?.total-income[0]?.total)?parseInt(income[1]?.total-income[0]?.total):"0"}</span>
          <span className="featuredMoneyRate">
          {perc>0 && "+"}  
          {Math.floor(perc)}
            {perc<0 ? (
              <ArrowDownward  className="featuredIcon negative"/>
              ):<ArrowUpward className="featuredIcon"/>}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
