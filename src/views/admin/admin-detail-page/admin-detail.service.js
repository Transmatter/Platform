import graphqlClient from '@/service/GraphQLClient';

const adminDetailService = () => {
    const getAdminDetail = (id) => {
        const query = `
        query($id:Int) {
	        getAdminById(id:$id){
		        id
		        username
		        firstname
		        lastname
		        status
		        email
		        phoneNo
                status
	        }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                id: id
            }
        }
        return graphqlClient(graphql);
    }

    const getVerifyStatusToUser = (id,status) => {
        const query = `
        mutation($id:Int,$status:String){
	        verifyAdmin(id:$id,status:$status){
		        id
		        username
		        status
		        email
	        }
        }
        `;
        const graphql = {
            query: query,
            variables : {
	            id: id,
	            status: status
            }
        }
        return graphqlClient(graphql);
    }

    const getNotVerifyStatusToUser = (id,reason,status) => {
        const query = `
        mutation($id:Int,$reason:String,$status:String){
            verifyAdmin(id:$id,reason:$reason,status:$status){
                id
                username
                status
                email
            }
        }
        `;
        const graphql = {
            query: query,
            variables : {
	            id: id,
	            status: status,
                reason : reason
            }
        }
        return graphqlClient(graphql);
    }

    return { getAdminDetail , getVerifyStatusToUser, getNotVerifyStatusToUser};
}
export default adminDetailService;