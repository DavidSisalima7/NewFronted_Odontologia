import axios from "axios";

export class PersonService {

    baseUrl = "http://localhost:8080/api/persona/";

    create(person) {

        return axios.post(this.baseUrl + "crear", person).then(res => res.data);
    }

    readAll() {

        return axios.get(this.baseUrl + "listar").then(res => res.data);
    }

    update(person) {

        return axios.put(this.baseUrl + "actualizar/" + person.id_persona, person).then(res => res.data);
    }

    delete(id) {

        return axios.delete(this.baseUrl + "eliminar/" + id);
    }
}