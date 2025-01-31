export const typeDefs = `#graphql
    type Restaurante {
        id:ID!
        nombre: String!
        direccion: String!
        ciudad:String!
        numero_telefono: String!
    }
    
    type Query{
        getRestaurant(id:String!):Restaurante!
        getRestaurants:[RestauranteMode!]!

    }
    type Mutation{
        addRestaurant(nombre:String!,direccion: String!,ciudad: String!,numero_telefono: String!):RestauranteMode!
        deleteRestaurant(id:String!)boolean!
    }
`