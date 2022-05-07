import React, { useState, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import DatatablesContext from "./index";


const apiCall = axios.create({
  baseURL: "http://localhost:8080/crueapi/config",
});

export default function DashboardProvider({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [isSearchingSeccions, setIsSearching] = useState();
  const [resultsS, setResults] = useState([]);
  const [error, setError] = useState();
  const [isSearchingDataItems, setIsSearchingDataItems] = useState();
  const [dataItems, setDataItems] = useState([]);
  

  const configurated = {
    headers: { Authorization: `Bearer ${currentUser.accessToken}`}
  };

  const getDataSeccions = async () => {
    try {
      setIsSearching(true);
      setError();
      setResults([]);

      const { data } = await apiCall.get(`/get-all-sections`, configurated);

      setResults(data);
    } catch (error) {
      setError("Algo ha ocurrido en el get");
    } finally {
      setIsSearching(false);
    }
  };

  const postNewSeccion = async (item) => {
    try {
      setIsSearching(true);
      setError();
      setResults([])

      await apiCall.post(`/add-section`, item, configurated).then((event) => window.location.reload(true));


    } catch (error) {
      setError("Algo ha ocurrido en el post");
      console.log(error)
    } finally {
      setIsSearching(false);
    }
  };

  const getDataItems = async () => {
    try {
      setIsSearchingDataItems(true);
      setError();
      setDataItems([]);

      const { data } = await apiCall.get(`/get-all-dataitems`, configurated);

      setDataItems(data);
    } catch (error) {
      setError("Algo ha ocurrido");
    } finally {
      setIsSearchingDataItems(false);
    }
  };

  const postNewDataItem = async (item) => {
    try {
      setIsSearchingDataItems(true);
      setError();
      setDataItems([]);

      await apiCall.post(`/add-dataitem`, item, configurated).then((event) => window.location.reload(true));


    } catch (error) {
      setError("Algo ha ocurrido en el post");
      console.log(error)
    } finally {
      setIsSearchingDataItems(false);
    }
  };


  return (
    <DatatablesContext.Provider value={{
      getDataSeccions,
      getDataItems,
      postNewSeccion,
      postNewDataItem,
      resultsS,
      error,
      isSearchingSeccions,
      isSearchingDataItems,
      dataItems
    }}>
      {children}
    </DatatablesContext.Provider>
  );
}