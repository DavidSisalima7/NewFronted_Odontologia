export interface Usuario {

    id_usuario: number;
    username: string;
    password: string;
}

export interface IPaciente {
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
