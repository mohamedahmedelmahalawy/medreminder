"use client";
import { DNA } from "react-loader-spinner";
function loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <DNA
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

export default loading;
