export interface IFicha{
    id_ficha?: number;
    diagnostico: string;
    observaciones: string;
    fecha_consulta: string;
    motivo_consulta: string;
    id_persona:number;
    habilitado:boolean;
}

export interface IPaciente{
    id_persona: number;
    cedula: string;
    nombre: string;
    email: string;
    fechaNac: string;
    genero: string;
    celular: string;
    direccion: string;
    telefono: string;
    apellido: string;
}