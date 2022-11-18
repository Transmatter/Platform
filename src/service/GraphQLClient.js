import axios from 'axios'

const graphqlAxiosInstant = axios.create({
    baseURL: "https://transmatter-admin.herokuapp.com",

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
})

const graphqlClient = (query) => {
    return graphqlAxiosInstant.post('/graphql', query)
}

export default graphqlClient;