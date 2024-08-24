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

export type user ={
    email:string,
    password:string
}

export type readingList = {
    email:string,
    bookList: book[]
}
