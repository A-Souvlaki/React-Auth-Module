/* eslint-disable no-unused-expressions */
import React, { useContext, useRef, useEffect, useCallback } from 'react'
import DashboardContainer from '../components/DashboardContainer/DashboardContainer'
import DashboardContext from '../context/Dashboard'
import AppContext from "../store/AppContext";
import axios from 'axios'
import { useSelector } from "react-redux";

const MainView = () => {
  const { error, resultsD, isSearching, getDashboards } = useContext(DashboardContext)

  const state = useContext(AppContext);

  const { user: currentUser } = useSelector((state) => state.auth);

  const loadPatients = async () => {
    try {

      const configurated = {
        headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        responseType: "json"
      };
      const response = await axios.get(
        "http://localhost:8080/crueapi/crue/get-patients", configurated
      );

      const patients = response.data;
      const headers = [];
      for (var key in patients[0]) {
        headers.push(key);
      }
      state.setPatients(patients);
      state.setPatientsHeaders(headers);
    } catch (error) { }
  };

  useEffect(() => {
    loadPatients()
  }, [])

  const fetchResultsRef = useRef();

  const fetchResults = useCallback(async () => {
    await getDashboards();
  }, []);

  fetchResultsRef.current = fetchResults;

  useEffect(() => {
    fetchResultsRef.current()?.catch(null);
  }, []);

  return (
    <div>
      {!error ? (
        <>
          {isSearching && <h1>Searching...</h1>}
          <DashboardContainer data={resultsD} recoPatients={state.patients} />
          {!isSearching && !resultsD?.length}
        </>
      ) : (
        <h1>{error}</h1>
      )}

    </div>

  )
};
export default MainView;