import graphqlClient from '@/service/GraphQLClient';

const ContentDetailSerivce = () => {

    const getContentById = (id) => {
        const query = `
        query($id:String){
            getContent(id:$id){
                id
                type
                source
                author
                title
                content
                images { url alt verifiedDate verifiedBy verifyStatus}
                public_date
                comment { author content time image_urls }
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

    const deleteContentById = (id) => {
        const query = `
        mutation($id:String){
            deleteContent(id:$id){
                id
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

    const updateImateAlt = (id,imagesAlt) => {
        const query = `
        mutation($id:String,$ImageText:[ImageText]){
            updateImageContent(id:$id,imageText:$ImageText){
                id
                author
                title
                content
                public_date
                images { url alt verifiedDate verifiedBy verifyStatus}
            }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                id: id,
                ImageText: imagesAlt
            }
        }
        return graphqlClient(graphql);
    }

    const updateContent = (id,content) => {
        const query = `
        mutation($id:String,$content:ContentInput){
            updateContent(id:$id,content:$content){
                id
                author
                title
                content
                public_date
                images { url alt verifiedDate verifiedBy verifyStatus}
                comment { author content time image_urls }
            }
        }
        `;
        const graphql = {
            query: query,
            variables: {
                id: id,
                content: content
            }
        }
        return graphqlClient(graphql);
    }

    return { getContentById, deleteContentById, updateImateAlt, updateContent };
}

export default ContentDetailSerivce;