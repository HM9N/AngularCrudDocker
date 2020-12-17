# Angularcrud

#Agregar estudiante: POST

http://localhost:4000/student/add

Todos los campos son requeridos excepto la nota (por defecto queda con valor 0) y el nit debe ser único
{
    "name":"Carlos",
    "lastName": "Duque",
    "nit": 12345678,
    "age": 30,
    "note": 5
}

#Obtener todos los estudiantes: GET

http://localhost:4000/student/

#Modificar los estudiantes que sean tengan 21 o más años: POST

http://localhost:4000/student/update
Se puede elegir el atributo que se desea cambiar, en este caso todos los atributus excepto el NIT, ya que éste 
es único.
{
    "name":"Carolina",
    "lastName": "Zapata",
    "age": 20
}

#Obtener un estudiante: GET

http://localhost:4000/student/:id

#Promedio del curso: GET

http://localhost:4000/student/mean

#Borrar estudiante: GET

http://localhost:4000/student/delete/:id

#Modificar estudiante: POST

http://localhost:4000/student/update/:id

{
    "name":"Carlos",
    "lastName": "Duque",
    "nit": 12345678,
    "age": 30,
    "note": 5
}


IMPORTANCIA DE LOS CONTENEDORES:

El uso de contenedores facilita mucho la labor de los desarrolladores, ya que permiten empaquetar la aplicación con todas sus partes (incluyendo bibliotecas y dependencias) y así garantiza que se ejecute en otra máquina sin importar sus caracteristicas. También se puede obtener un despliegue más rápido usando estas tecnologías.




