import React, {useState } from "react";
import { Spin } from "antd";
import Login from "../auth/Login";

const Loader = () => {
 const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-white">
          <Spin  size="large" />
        </div>
      ) : (
        <Login/>
      )}
    </>
  );
};

export default Loader;
