import { GraphQLError } from "graphql"
import { Api_Phone,Api_HoraCiudad ,Api_Clima} from "./types.ts";


const API_KEY = Deno.env.get("API_KEY")

//api telefono
export const validar_telefono = async (numero_telefono:string)=>{
    if(!API_KEY) throw new GraphQLError("Error en la api key")

    const url_validar= `https://api.api-ninjas.com/v1/validatephone?number=${numero_telefono}`

    const data= await fetch(url_validar,{
        headers:
        {
            'X-Api-Key': API_KEY
        }
    })
    if (data.status!==200) throw new GraphQLError("Error a la hora de procesar datos en api")
    const result:Api_Phone = await data.json()
    return{
        is_valid: result.is_valid
    }
}
//api ubica

export const obtener_hora = async (ciudad:string)=>{
    if(!API_KEY) throw new GraphQLError("Error en la api key")

    const url_validar= `https://api.api-ninjas.com/v1/worldtime?city=${ciudad}`

    const data= await fetch(url_validar,{
        headers:
        {
            'X-Api-Key': API_KEY
        }
    })
    if (data.status!==200) throw new GraphQLError("Error a la hora de procesar datos en api")
    const result:Api_HoraCiudad = await data.json()
    return result.datetime.split("T")[1]
}

export const obtener_climas = async (ciudad:string)=>{
    if(!API_KEY) throw new GraphQLError("Error en la api key")

    const url_validar= `https://api.api-ninjas.com/v1/weather?city=${ciudad}`

    const data= await fetch(url_validar,{
        headers:
        {
            'X-Api-Key': API_KEY
        }
    })
    if (data.status!==200) throw new GraphQLError("Error a la hora de procesar datos en api")
    const result:Api_Clima = await data.json()
    return '${result.temp}'

}

