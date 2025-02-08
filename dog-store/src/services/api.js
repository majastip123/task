const BASE_URL = "https://dogapi.dog/api/v2";

export const getAllDogBreeds = async () => {
  try {
    const response = await fetch(`${BASE_URL}/breeds`);

    if (!response.ok) throw new Error("Failed to get dog breeds");

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllGroups = async () => {
  try {
    const response = await fetch(`${BASE_URL}/groups`);

    if (!response.ok) throw new Error("Failed to get dog groups");

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getDogBreed = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/breeds/${id}`);

    if (!response.ok) throw new Error("Failed to get dog breed");

    return await response.json();
  } catch (error) {
    throw error;
  }
};
