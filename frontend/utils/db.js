const baseUrl = "http://localhost:8080/";

const getUrl = (type, id = null) => {
  let url = `${baseUrl}${type}`;
  if (id !== null) {
    url += `/${id}`;
  }
  return url;
};

export async function getAll(type) {
  try {
    const res = await fetch(getUrl(type, "all"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("HTTP error, status = " + res.status);
    }
    const data = await res.json();
    return data ? data : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getById(type, id) {
  try {
    const res = await fetch(getUrl(type, parseInt(id)), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("HTTP error, status = " + res.status);
    }
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export async function create(type, data) {
  try {
    const res = await fetch(getUrl(type), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("HTTP error, status = " + res.status);
    }
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
