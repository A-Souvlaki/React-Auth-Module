import React, { useState, useContext } from "react";
import axios from "axios";

import DashboardContext from "./index";
import { useSelector } from "react-redux";



const apiCall = axios.create({
  baseURL: "http://localhost:8080/crueapi/crue",
});

function  DashboardProvider ({ children })  {


  const [isSearching, setIsSearching] = useState();
  const [resultsD, setResults] = useState([]);
  const [error, setError] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);

  const getDashboards = async () => {
    try {

      

      const configurated = {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
          responseType: "json"
      };

      setIsSearching(true);
      setError();
      setResults([]);

      const { data } = await apiCall.get(`/dashboard`, configurated);

      setResults(data);
      
    } catch (error) {
      setError("Error en la obtencion");
      
    } finally {
      setIsSearching(false);
    }
  };



  return (
    <DashboardContext.Provider value={{
      getDashboards,
      resultsD,
      error,
      isSearching,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider