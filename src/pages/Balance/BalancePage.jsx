import React, { useEffect, useState } from 'react'
import styles from './BalancePage.module.css'
import axios from 'axios';
import { IoIosArrowRoundBack } from "react-icons/io";
import {useNavigate} from "react-router-dom"

const BalancePage = () => {

  const navigate = useNavigate()

  const [amount, setAmount] = useState(null);
  console.log("amount", amount)

  // ✅ Fetch user balance when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
          withCredentials: true,
        });

        console.log("Fetched balance:", response.data);
        setAmount(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  // ✅ Function to update balance
  const handleAddMoney = async () => {
    try {
      if (!amount) {
        console.error("Balance not initialized yet.");
        return;
      }

      const response = await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
        balance: amount.balance + 100,
      }, {
        withCredentials: true,
      });

      console.log("Updated balance:", response.data);
      setAmount(response.data);
    } catch (error) {
      console.error("Error updating balance:", error.response?.data || error.message);
    }
  }

  return (
    <>
      {
        amount ? (
          <div className={styles.maincontainer}>
            <div className={styles.backbtn}><IoIosArrowRoundBack className={styles.iconback} onClick={()=>navigate("/")}/></div>
            <div className={styles.balanceBox}>
              <h1>Account Balance</h1>
              <h2>₹ {amount.balance}</h2>
              <button className={styles.btn} onClick={handleAddMoney}>ADD MONEY</button>
            </div>
          </div>
        ) : (
          <h1>Loading balance...</h1>
        )
      }
    </>
  )
}

export default BalancePage