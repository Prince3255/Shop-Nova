import React, { useEffect } from 'react';
import { useGetDealQuery } from "../Features/ECOMMERCEAPI";
import Loading from "./Loading";
import Error from "./Error";

const DealData = ({ onData }) => {
  const { data, isLoading, error } = useGetDealQuery({
    country: 'US',
    offSet: 0,
    categoryProduct: 'aps',
    star: 'ALL',
    price: 'ALL',
    discount: 'ALL',
    sortBy: 'FEATURED',
    currentPage: 1,
  });

  

  
  useEffect(() => {
      onData(data?.data?.deals);
  }, [data, onData]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return null; // No UI rendered
};

export default DealData;