export const createUserWithEmailAndPassword = async ( body ) => {
  try {
    // const url = import.meta.env.VITE_API_URL;

    const res = await fetch(`/api/v1/users/signup`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const signOut = async () => {
  try {
    const res = await fetch(`/api/v1/users/logout`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const checkAndCreateUser = async ( userAuth, token, referral ) => {
  try {
    const { email, displayName } = userAuth;

    console.log("create Data ", { 
      email,
      name: displayName,
      isOAuth: true,
      referral
    });
    
    const data = await createUserWithEmailAndPassword({ 
      email,
      name: displayName,
      isOAuth: true,
      referral
    });

    if(data && data.status !== "success") {
      const response = await getTokenUsingOAuth({ 
        email,
        token
      });

      return response;
    }

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const signInWithEmailAndPassword = async ( body ) => {
  try {
    const res = await fetch(`/api/v1/users/login`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const getTokenUsingOAuth = async ( body ) => {
  try {
    const res = await fetch(`/api/v1/users/get-token`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const checkUserLogin = async () => {
  try {
    const res = await fetch(`/api/v1/users/refresh-token`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({})
    });
    const data = await res.json();

    if( data.status !== "success" ) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong",
      statusCode: error.statusCode
    };
  }
}

export const getUserReferrals = async (currentUser) => {
  try {
    const res = await fetch(`/api/v1/referrals/users/${currentUser._id}`);
    const data = await res.json();

    if( data.status !== "success" ) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const getUserReferralLink = async (currentUser) => {
  try {
    const res = await fetch(`/api/v1/referrals/referral-links?q_belongsTo=${currentUser._id}`);
    const data = await res.json();

    if( data.status !== "success" ) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}

export const createUserReferralLink = async (currentUser) => {
  try {
    const res = await fetch(`/api/v1/referrals/referral-links`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({})
    });
    const data = await res.json();

    if( data.status !== "success" ) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log("error ", error);
    return {
      status: "failed",
      message: "Something went wrong"
    };
  }
}