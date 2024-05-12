export async function login(tc, password, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      if (data) {
        const user = data.find(
          (user) => user.tc === tc && user.password === password
        );

        if (user) {
          console.log("User Found");
          return user;
        } else {
          console.log("User Not Found");
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(null);
    return false;
  }

  return false;
}

export async function loginUserById(id, type) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        return true;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }

  return false;
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

    if (res.status === 400) {
      alert("User already exists!");
      return false;
    }

    const data = await res.json();
    console.log(data);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      loginUserById(data.id, type);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
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
