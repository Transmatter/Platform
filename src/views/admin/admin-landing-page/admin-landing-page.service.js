import graphqlClient from '@/service/GraphQLClient';

const AdminLandingPageService = () => {
    const getAllContent = (page = 1) => {
        const query = `
        query($filter:PageFilter) {
            getAllContents(filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    source
                    title
                    author
                    public_date
                }
            }
        }
        `;

        const graphql = {
            query: query,
            variables: {
                filter: {
                    page: page,
                    size: 3,
                },
            },
        };
        return graphqlClient(graphql);
    };

    const getAllEmptyAltNews = (page = 1) => {
        const query = `
        query($filter:PageFilter) {
            getAllEmptyAltNews(filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    source
                    title
                    author
                    public_date
                }
            }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                filter: {
                    page: page,
                    size: 3,
                },
            },
        };
        return graphqlClient(graphql);
    };

    const getContentType = (type,page=1) => {
        const query = `
            query($type:String,$filter:PageFilter){
	            getContentByType(type:$type,filter:$filter){
		            number
		            totalPages
		            totalElements
		            content {
	  	                id
                        type
		                source
		                title
                        author
		                public_date
		            }
	            }
            }
        `;
        const graphql = {
            query: query,
            variables: {
                type: type,
                filter: {
                    page: page,
                    size: 3,
                },
            }
        }
        return graphqlClient(graphql);
    };

    const getContentBySourceAndCategory = (source, type, page = 1) => {
        const query = `
        query ($source: String, $type: String, $filter: PageFilter) {
            getNewsBySourceAndType(source: $source, type: $type, filter: $filter) {
                number
                totalPages
                totalElements
                content {
                    id
                    type
                    source
                    title
                    author
                    public_date
                }
            }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                filter: {
                    page: page,
                    size: 3,
                },
                source: source,
                type: type,
            },
        };
        return graphqlClient(graphql);
    };

    return { getAllContent, getAllEmptyAltNews, getContentBySourceAndCategory, getContentType };
};

export default AdminLandingPageService;
