export default {
  adopter: [
    { '/users': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
    { '/visits': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
    { '/pets': ['GET'] },
    { '/headquarters': ['GET'] },
  ],
};
