import axios from 'axios'

const graphqlAxiosInstant = axios.create({
    baseURL: "http://52.230.104.188:8080",

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
})

const graphqlClient = (query) => {
    return graphqlAxiosInstant.post('/graphql', query)
}

export default graphqlClient;