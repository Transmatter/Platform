import graphqlClient from '@/service/GraphQLClient';

const adminWatingListService = () => {
    const getAdminWatingList = (page=1) => {
       const query = `
           query($filter:PageFilter){
            getUnVerifyAdmin(filter:$filter){
                totalPages
                totalElements
                number
                content {
                    id	
                    username
                    firstname
                    lastname
                    email
                    phoneNo
                }
            }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                filter: {
                    page: page,
                    size: 5
                }
            }
        }
        return graphqlClient(graphql);
    }
    return { getAdminWatingList };
}

export default adminWatingListService;