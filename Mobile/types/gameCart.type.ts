export type GameCart = {
    id: string,
    name: string,
    mainImage: string,
    tags: {
        id: string,
        name: string,
        image: {
            src: string
        }
    }[],
    price: {
        amount: number,
        currency: string
    }
}