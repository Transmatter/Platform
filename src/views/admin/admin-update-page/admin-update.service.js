import graphqlClient from '@/service/GraphQLClient'

const adminUpdateService = () => {
    const updateAdmin = (id,user) => {
        const query = `
        mutation($id:Int,$user:UserInput){
	        updateAdmin(id:$id,admin:$user){
		        id
		        username
		        firstname
		        lastname
		        email
		        phoneNo
	        }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                id: id,
                user : user
            }
        }
        return graphqlClient(graphql)
    }
    return { updateAdmin }
}
export default adminUpdateService;