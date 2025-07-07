import {createContext,useContext,useState} from 'react'

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  
  let arr = [0]
  const [wholedata,setWholedata] = useState([])
  const [balence,setbalence] = useState(arr)
  const [user,setUser] = useState([]);

  return (
    <AppContext.Provider value={{wholedata,setWholedata,balence,setbalence,user,setUser}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}