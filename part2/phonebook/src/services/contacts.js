import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
 return axios.post('http://localhost:3001/api/persons', newObject)
}

const update = (id, newObject) => {
 return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteContact = (id) => {
 return axios.delete(`${baseUrl}/${id}`)
}

export default {
 getAll: getAll,
 create: create,
 update: update,
 deleteContact: deleteContact
}