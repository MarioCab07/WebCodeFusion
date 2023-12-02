import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const login = async (formData) => {
  try {
    const response = await axios.post("/auth/login", formData);

    if (response.status === 200) {
      return response.data;
    }

    if (response.status === 404) {
      return 404;
    }
  } catch (error) {
    return 404;
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post("/auth/register", formData);

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    if (error.response.status === 409) {
      return [409, error.response.data.error];
    }

    if (error.response.status === 400) {
      return [400, error.response.data.errors];
    }
  }
};

export const GetAllTags = async () => {
  try {
    const response = await axios.get(`/tag`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetTag = async (tagname) => {
  try {
    const response = await axios.get(`/tag/${tagname}`);

    if (response.status === 200) {
      return response.data.tag[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllAttributes = async () => {
  try {
    const response = await axios.get("/attribute");

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAttribute = async (attribute) => {
  try {
    const response = await axios.get(`/attribute/${attribute}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllSelectors = async () => {
  try {
    const response = await axios.get(`/selector`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetSelector = async (selector) => {
  try {
    const response = await axios.get(`/selector/${selector}`);

    if (response.status === 200) {
      console.log(response.data.selector[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllProperty = async () => {
  try {
    const response = await axios.get(`/property`);

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetProperty = async (property) => {
  try {
    const response = await axios.get(`/property/${property}`);

    if (response.status === 200) {
      console.log(response.data.property[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllLength = async () => {
  try {
    const response = await axios.get(`/lenght`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetLength = async (length) => {
  try {
    const response = await axios.get(`/lenght/${length}`);

    if (response.status === 200) {
      return response.data.lengths;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllProblems = async () => {
  try {
    const response = await axios.get(`/problem`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetProblem = async (level) => {
  try {
    const response = await axios.get(`/problem/${level}`);
    return response.data.problem[0];
  } catch (error) {
    console.log(error);
  }
};

const fetchTagsQuery = async (query) => {
  try {
    const response = await axios.get(`/tag?${query}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTagsByQuery = async (offset) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", 9);
  queryParams.append("offset", offset);
  return await fetchTagsQuery(queryParams.toString());
};

export const findMe = async (token) => {
  try {
    const response = await axios.get("/auth/findme", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return;
    }

    return response;
  } catch (error) {
    return "";
  }
};

export const SaveTag = async (data, token) => {
  try {
    const response = await axios.post("/tag", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    return [400, error.response.data.errors];
  }
};

export const saveSelector = async (data, token) => {
  try {
    const response = await axios.post("/selector", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    return [400, error.response.data.errors];
  }
};

export const SaveAttribute = async (data, token) => {
  try {
    const response = await axios.post("/attribute", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    return [400, error.response.data.errors];
  }
};

export const SaveLength = async (data, token) => {
  try {
    const response = await axios.post("/lenght", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    return [400, error.response.data.errors];
  }
};

export const SaveProperty = async (data, token) => {
  try {
    const response = await axios.post("/property", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return [201, response.data];
    }
  } catch (error) {
    return [400, error.response.data.errors];
  }
};

export const addLineBreaks = (htmlCode) => {
  const closingTagRegex = /<\/\w+>/g;
  const htmlCodeWithLineBreaks = htmlCode.replace(
    closingTagRegex,
    (match) => `${match}\n`
  );

  return htmlCodeWithLineBreaks;

  // export const getTagsByQuery = async (offset) => {
  //   const queryParams = new URLSearchParams();
  //   queryParams.append("limit", 9);
  //   queryParams.append("offset", offset);
  //   return await fetchTagsQuery(queryParams.toString());
  // };

  // const fetchTagsQuery = async (query) => {
  //   try {
  //     const response = await axios.get(`/tag?${query}`);

  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
};

export const getPropertiesByQuery = async (offset) => {
  const queryParamas = new URLSearchParams();
  queryParamas.append("limit", 6);
  queryParamas.append("offset", offset);
  return await fetchPropertyQuery(queryParamas.toString());
};

const fetchPropertyQuery = async (query) => {
  try {
    const response = await axios.get(`/property?${query}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveGame = async (data, token) => {
  try {
    const response = await axios.post("/game/save", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return 200;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findUserGames = async (identifier, token, offset = 0) => {
  const queryParamas = new URLSearchParams();
  queryParamas.append("limit", 6);
  queryParamas.append("offset", offset);
  const query = queryParamas.toString();

  try {
    const response = axios.get(`/user/${identifier}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if ((await response).status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};

export const rankedGames = async (identifier, offset = 0) => {
  const queryParamas = new URLSearchParams();
  queryParamas.append("limit", 5);
  queryParamas.append("offset", offset);
  const query = queryParamas.toString();

  try {
    const response = await axios.get(`/game/${identifier}?${query}`);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveComment = async (content, token) => {
  try {
    const response = await axios.post("/comment", content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (content, token, identifier) => {
  try {
    const response = await axios.post(`/comment/${identifier}`, content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (identifier, token) => {
  try {
    const response = await axios.patch(
      `/comment/like/${identifier}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllComments = async (offset = 0) => {
  const queryParams = new URLSearchParams();
  queryParams.append("offset", offset);
  queryParams.append("limit", 120);

  const query = queryParams.toString();

  try {
    const response = await axios.get(`/comment?${query}`);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveResponse = async (content, token, identifier) => {
  try {
    const response = await axios.patch(
      `/comment/response/${identifier}`,
      content,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return 200;
    }
  } catch (error) {
    console.log(error);
  }
};
