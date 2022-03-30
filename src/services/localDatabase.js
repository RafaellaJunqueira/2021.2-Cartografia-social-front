import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error('Error saving local data');
  }
};

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    throw new Error('Error getting local data');
  }
  throw new Error('No data found');
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error('Error deleting local data');
  }
};

const getEntityArray = async (entityName) => {
  try {
    return await getData(entityName);
  } catch (e) {
    if (e.message === 'No data found') {
      return [];
    }
    throw e;
  }
};

export const getAll = (entityName) => getEntityArray(entityName);

export const exists = async (entityName, id) => {
  try {
    await getData(`${entityName}_${id}`);
    return true;
  } catch (e) {
    if (e.message === 'No data found') {
      return false;
    }
    throw e;
  }
};

export const put = async (entityName, data) => {
  if (!data.id) {
    throw new Error('No id provided');
  }
  let entityArray = await getEntityArray(entityName);
  if (await exists(entityName, data.id))
    entityArray = entityArray.map((e) => (e.id === data.id ? data : e));
  else entityArray.push(data);

  storeData(`${entityName}_${data.id}`, data);
  storeData(entityName, entityArray);
};

export const post = async (entityName, data) => {
  if (await exists(entityName, data.id)) {
    throw new Error('Entity already exists');
  }
  await put(entityName, data);
};

export const get = async (entityName, id) => {
  return getData(`${entityName}_${id}`);
};

export const remove = async (entityName, id) => {
  const entityArray = await getAll(entityName);
  storeData(
    entityName,
    entityArray.filter((e) => e.id !== id),
  );
  deleteData(`${entityName}_${id}`);
};
