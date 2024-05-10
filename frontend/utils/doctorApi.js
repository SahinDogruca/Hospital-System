export async function login(tc, password, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const user = data.find(
      (user) => user.tc === tc && user.password === password
    );

    if (user) {
      console.log("User Found");

      return user;
    } else {
      console.log("User Not Found");
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function loginUserById(id, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function register(user, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    loginUserById(data.id, type);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function logout() {
  localStorage.removeItem("user");
}

export async function update(id, user, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
