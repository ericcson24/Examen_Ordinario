//funciones graphql
import { Collection, ObjectId } from "mongodb";
import { RestauranteModel,  } from "./types.ts";
import { validar_telefono,obtener_hora } from "./utils.ts";
import { GraphQLError } from "graphql";

type context={
    RestaurantesCollection: Collection<RestauranteModel>
}

type MutationRestaurante={
    id: string,
    nombre: string,
    numero_telefono: string,
    direccion: string,
    ciudad:string,
    
}

export const resolvers = {
    
    Restaurante:{
        id: (parent:RestauranteModel) => parent._id.toString()
    },
    
    Query: {
        getRestaurant:async(
            _:unknown,
            args:MutationRestaurante,
            context:context
        ):Promise<RestauranteModel>=>{
            //primero ver si existe
            const result= await context.RestaurantesCollection.findOne({_id:new ObjectId(args.id)})
            if(!result) throw new GraphQLError("No hay restaurante con ese id")
            
            const hora= await obtener_hora(result.ciudad)
            
            return{
                _id:result._id,
                nombre: result.nombre,
                numero_telefono: result.numero_telefono,
                direccion: result.direccion,
                
                ciudad:result.ciudad,
                 
                hora 
                
            }
        },

        
        
        
    },



    Mutation: {
        addRestaurant:async(
            _:unknown,
            args:MutationRestaurante,
            context:context
        ): Promise<RestauranteModel> =>{
            //ver si hay algun restaurante con el mismo nobre
            const result= await context.RestaurantesCollection.findOne({

                $or:[
                    {
                        nombre:args.nombre
                    },
                    {
                        numero_telefono:args.numero_telefono
                    }
                ]

            }
            )
            if(result) throw new GraphQLError("Ya existe el restaurante")
            const telefono_validado=  await validar_telefono(args.numero_telefono)
            if(!telefono_validado)throw new GraphQLError("No existe el retaurante")

            const { insertedId } = await context.RestaurantesCollection.insertOne({
                    nombre: args.nombre,
                    direccion: args.direccion,
                    ciudad: args.ciudad,
                    numero_telefono: args.numero_telefono,
            })
            return{
                _id:insertedId,
                nombre: args.nombre,
                direccion: args.direccion,
                ciudad: args.ciudad,
                numero_telefono: args.numero_telefono,
            }
            

        },

        deleteRestaurant:async(
            _:unknown,
            args:{id:string},
            context:context
        ):Promise<boolean>=>{
            //ver si hay algun restaurante con el mismo nobre
            const {deletedCount}= await context.RestaurantesCollection.deleteOne({_id:new ObjectId(args.id)})
            if (!deletedCount) return false
            return true
        },
        
        
        

    },
}


/*
        getRestaurants: async (
            _: unknown,
            args: { ciudad: string },
            context: context
        ): Promise<RestauranteModel[]> => {
            // Buscar restaurantes por ciudad
            const results = await context.RestaurantesCollection.find({ ciudad: args.ciudad }).toArray()
            if (results.length === 0) throw new GraphQLError("No hay restaurantes en esa ciudad")

            return await Promise.all(
                results.map(async (restaurante) => {
                    const hora = await obtener_hora(restaurante.ciudad)
                    return {
                        _id: restaurante._id,
                        nombre: restaurante.nombre,
                        numero_telefono: restaurante.numero_telefono,
                        direccion: restaurante.direccion,
                        ciudad: restaurante.ciudad,
                        hora
                    }
                })
            )
        },*/