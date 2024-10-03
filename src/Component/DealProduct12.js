export const DealProduct12 = async (dealId, country, sortBy) => {
  
const apiKey = import.meta.env.VITE_EC_API_KEY
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://real-time-amazon-data.p.rapidapi.com/deal-products?deal_id=${dealId}&country=${country}&sort_by=${sortBy}&page=1`, options)
    const data = await response.json()
    console.log(data)
    return data?.data?.products[0]?.product_asin || ''
  } catch (error) {
    console.log(error)
    return ''
  }

}