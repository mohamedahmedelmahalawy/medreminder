import { AxiosInterceptor } from "./medreminder/src/interceptor/interceptor";
async function getDr(code: string) {
  const url = "/doctors/";

  {
    const hotelDetails = AxiosInterceptor.get(url + code)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));

    return hotelDetails;
  }
}

const auth = JSON.parse(localStorage.getItem("auth") || "{}")
