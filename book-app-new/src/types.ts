
export type auth = {
    userId: string,
    accessToken:string
}

export type book = {
    id:string,
    volumeInfo:{
        title:string,
        authors:string[],
        publisher:string,
        publishedDate:string, 
        description:string,
        imageLinks:{
            smallThumbnail:string,
            thumbnail:string
        }
    },
    saleInfo:{
        buyLink:string
    }

}