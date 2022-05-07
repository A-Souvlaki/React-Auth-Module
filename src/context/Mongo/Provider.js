import React, { useState } from "react";
import axios from "axios";

import MongoContext from "./index";

const apiCall = axios.create({
  baseURL: "http://localhost:3130/crueapi/crue",
});

export default function MongoProvider({ children }) {
  const [isSending, setIsSending] = useState();
  const [results, setResults] = useState([]);
  const [error, setError] = useState();


  const postMongo = async ( action, madeById, madeByName, patientRac) => {
    try {
      setIsSending(true);
      setError();
      setResults([]);
      const item = {
        type:action,
        madeById:madeById,
        madeByName:madeByName,
        patientRac:patientRac,
        date:new Date().toISOString(),
        description:"",     
        logId: patientRac + madeById 
      }

      const { data } = await apiCall.post(`/movements/movement`, item);

      setResults(data);
    } catch (error) {
      setError("Algo ha ocurrido");
    } finally {
        setIsSending(false);
    }
  };



  return (
    <MongoContext.Provider value={{
      postMongo,
      results,
      error,
      isSending,
    }}>
      {children}
    </MongoContext.Provider>
  );
}