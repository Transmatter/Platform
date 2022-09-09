import graphqlClient from "@/service/GraphQLClient";

const ContentService = () => {
    const getAllContents = (page=1) => {
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
                    content
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
		            size: 3
	            }
            }
        }
        return graphqlClient(graphql);
    };
    
    const getContents = (source,page) => {
        const query = `
        query($source:String,$filter:PageFilter){
            getNewsBySource(source:$source,filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    source
                    content
                    title
                    author
                    public_date
                }
            }
        }
        `;

        const graphql = {
            query: query,
            variables : {
                source: source,
            	filter: {
		            page: page,
		            size: 3
	            }
            }
        }
        return graphqlClient(graphql);
    };

    const getNewsBySourceAndCategory = (source,category,page) => {
        const query = `
        query($source:String,$type:String,$filter:PageFilter){
            getNewsBySourceAndType(source:$source,type:$type,filter:$filter){
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
            variables : {
                source: source,
                type : category,
                filter: {
		            page: page,
		            size: 3
	            }
            }
        }
        return graphqlClient(graphql);
    }

    const searchContent = (keyword,page) => {
        const query = `
        query($title:String,$filter:PageFilter){
            searchNews(title:$title,filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    source
                    content
                    title
                    author
                    public_date
                }
            }
        }
        `;
        const graphql = {
            query: query,
            variables : {
                title: keyword,
            	filter: {
		            page: page,
		            size: 5
	            }
            }
        }
        return graphqlClient(graphql);
    }
    return { getAllContents, getContents, searchContent,getNewsBySourceAndCategory};
};

export default ContentService;
