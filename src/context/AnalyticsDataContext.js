import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

export const AnalyticsData = createContext();

export const AnalyticsDataProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiSecret = process.env.REACT_APP_API_KEY;
  const [loader, setLoader] = useState(false);

  console.log(apiUrl,apiSecret,"apii");
  const getGraphData = async (lte, gte) => {
    const response = await fetch(`${apiUrl}/myquery`, {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": apiSecret,
      },
      method: "POST",
      body: JSON.stringify({ lte, gte }),
    });
    const result = await response.json();
    console.log(result, "result");
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    getGraphData("2022-10-04", "2022-10-04");
  }, []);

  const value = {
    setLoader,
  };

  return (
    <AnalyticsData.Provider value={value}>{children}</AnalyticsData.Provider>
  );
};
