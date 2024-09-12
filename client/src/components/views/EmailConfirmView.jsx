import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../config";

function EmailConfirmView() {
  const { emailConfirmToken } = useParams();

  const [displayMsg, setDisplayMsg] = useState(false);

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const res = await axios.post(BASE_URL + `api/users/confirmEmail`, {
          emailConfirmToken,
        });
        if (res.data?.status === "success") {
          setIsEmailConfirmed(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    confirmEmail();
  });

  setTimeout(() => {
    setDisplayMsg(true);
  }, 3000);

  return (
    <div>
      {isEmailConfirmed ? (
        <div className="m-auto mt-40 text-center">
          <h2 className="text-3xl mb-3 text-primary">Congratulations!!</h2>
          <p>Your account is active. You can login now.</p>
        </div>
      ) : displayMsg ? (
        <div className="m-auto mt-40 text-center">
          <h2 className="text-3xl mb-3 text-primary">Something Went Wrong!!</h2>
        </div>
      ) : (
        "Loading.."
      )}
    </div>
  );
}

export default EmailConfirmView;
