import graphqlClient from "@/service/GraphQLClient";

const ContentService = () => {
    const getAllContents = (page=1,size=3) => {
        const query = `query($filter:PageFilter) {
            getAllApprovedContent(filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    category
                    content
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
		            size: size 
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
                    category
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

    const getNewsBySourceAndCategory = (source,category,page=1,size=3) => {
        const query = `
        query ($source: String, $type: String, $filter: PageFilter) {
            getOnlyApprovedContentBySource(source: $source, category: $type, filter: $filter) {
                number
                totalPages
                totalElements
                content {
                    id
                    type
                    category
                    content
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
		            size: size
	            }
            }
        }
        return graphqlClient(graphql);
    }

    const searchContent = (keyword,page=1,size=3) => {
        const query = `
        query($title:String,$filter:PageFilter){
            searchOnlyApprovedContent(title:$title,filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    category
                    source
                    content
                    title
                    author
                    public_date
                    approveStatus
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
		            size: size
	            }
            }
        }
        return graphqlClient(graphql);
    }

    const searchContentBySrcAndCate = (keyword,source,category,page=1,size=3) =>{
        const query = `
        query (
            $source: String
            $category: String
            $title: String
            $filter: PageFilter
        ) {
            searchOnlyApprovedContentSpecInSrcAndCate(
                title: $title
                source: $source
                category: $category
                filter: $filter
            ) {
                number
                totalPages
                totalElements
                content {
                    id
                    category
                    source
                    title
                    content
                    author
                    public_date
                    approveStatus
                }
            }
        }
        `;

        const graphql = {
            query: query,
            variables : {
                title: keyword,
                source: source,
                category: category,
                filter: {
                    page: page,
                    size: size
                }
            }
        }
        return graphqlClient(graphql);
    }
    return { getAllContents, getContents, searchContent,getNewsBySourceAndCategory,searchContentBySrcAndCate };
};

export default ContentService;
