import {  OptionalId } from "mongodb";


export type RestauranteModel =OptionalId<{
    nombre: string,
    direccion: string,
    ciudad:string,
    numero_telefono: string,
    hora?:string,
    clima?:string
}>

export type Api_Phone={
    is_valid:boolean
}

export type Api_HoraCiudad={
    
    datetime:string
}
export type Api_Clima={
    
    wind_speed:string,
    temp:number
    max_temp:number
}
