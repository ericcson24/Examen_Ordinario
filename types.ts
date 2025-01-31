import { ObjectId, OptionalId } from "mongodb";



export type RestauranteModel =OptionalId<{
    nombre: string,
    direccion: string,
    ciudad:string,
    numero_telefono: string,
    hora?:string
}>

export type Api_Phone={
    is_valid:boolean
}

export type Api_HoraCiudad={
    
    datetime:string
}

