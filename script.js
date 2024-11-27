$(document).ready(function() {
    $('.menus').hide()
    $('p').click(function() {
        $(this).next('.menus').stop(true, true).slideToggle(1000).siblings('.menus').slideUp(1000)
    })
})

class Enlace {
    constructor(color, nombre, modo, link = null, evento = null) {
        this._color = color
        this._nombre = nombre
        this._modo = modo
        this._link = link
        this._evento = evento
    }

    get color() {
        return this._color
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor
        } else {
            throw new Error("El valor de 'color' debe ser un string.")
        }
    }

    get nombre() {
        return this._nombre
    }

    set nombre(valor) {
        if (typeof valor === 'string') {
            this._nombre = valor
        } else {
            throw new Error("El valor de 'nombre' debe ser un string.")
        }
    }

    get modo() {
        return this._modo
    }

    set modo(valor) {
        if (valor === 'link' || valor === 'evento') {
            this._modo = valor
        } else {
            throw new Error("El valor de 'modo' debe ser 'link' o 'evento'.")
        }
    }

    get link() {
        return this._link
    }

    set link(valor) {
        if (valor === null || typeof valor === 'string') {
            this._link = valor
        } else {
            throw new Error("El valor de 'link' debe ser un string o null.")
        }
    }

    get evento() {
        return this._evento;
    }
    
    set evento(valor) {
        if (valor === null || valor instanceof Event) {
            this._evento = valor;
        } else {
            throw new Error("El valor de 'evento' debe ser una instancia de Event o null.");
        }
    }

    get todoEnlace() {
        return {
            color: this.color,
            nombre: this.nombre,
            modo: this.modo,
            link: this.link,
            evento: this.evento
        }
    }
}

class Categoria {
    constructor(color, nombre) {
        this._color = color
        this._nombre = nombre
        this._enlaces = []
    }

    get color() {
        return this._color
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor
        } else {
            throw new Error("El valor de 'color' debe ser un string.")
        }
    }

    get nombre() {
        return this._nombre
    }

    set nombre(valor) {
        if (typeof valor === 'string') {
            this._nombre = valor
        } else {
            throw new Error("El valor de 'nombre' debe ser un string.")
        }
    }

    agregarEnlace(enlace) {
        if (enlace instanceof Enlace) {
            this._enlaces.push(enlace)
        } else {
            throw new Error("Debe agregar una instancia válida de Enlace.")
        }
    }

    get enlaces() {
        return this._enlaces.map((enlace) => enlace.todoEnlace)
    }

    get todoCategoria() {
        return {
            color: this.color,
            nombre: this.nombre,
            enlaces: this.enlaces,
        }
    }
}

class Menu {
    constructor(color, fuente, tamaño, posicion, id) {
        this._color = color
        this._fuente = fuente
        this._tamaño = tamaño
        this._posicion = posicion
        this._id= id
        this._categorias = []
    }

    get color() {
        return this._color
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor
        } else {
            throw new Error("El valor de 'color' debe ser un string.")
        }
    }

    get fuente() {
        return this._fuente
    }

    set fuente(valor) {
        if (typeof valor === 'string') {
            this._fuente = valor
        } else {
            throw new Error("El valor de 'fuente' debe ser un string.")
        }
    }

    get tamaño() {
        return this._tamaño
    }

    set tamaño(valor) {
        if (typeof valor === 'string') {
            this._tamaño = valor
        } else {
            throw new Error("El valor de 'tamaño' debe ser un string.")
        }
    }

    get posicion() {
        return this._posicion
    }

    set posicion(valor) {
        if (valor === 'horizontal' || valor === 'vertical') {
            this._posicion = valor
        } else {
            throw new Error("El valor de 'posicion' debe ser 'horizontal' o 'vertical'.")
        }
    }

    get id(){
        return this._id
    }

    set id(idNuevo){
        if (typeof idNuevo === 'string') {
            this._id = idNuevo
        } else {
            throw new Error("El valor de 'id' debe ser un string.")
        }
    }

    agregarCategoria(categoria) {
        if (categoria instanceof Categoria) {
            this._categorias.push(categoria)
        } else {
            throw new Error("Debe agregar una instancia válida de Categoria.")
        }
    }

    get categorias() {
        return this._categorias.map((categoria) => categoria.todoCategoria)
    }

    renderizarMenu() {
        const $nav = $(this._id)

        if ($nav.length === 0) {
            throw new Error("No se encontró el elemento con el identificador #nav.")
        }

        $nav.empty()
        $nav.css({
            fontFamily: this.fuente,
            fontSize: this.tamaño,
            backgroundColor: this.color,
            display: this.posicion === 'horizontal' ? 'flex' : 'block',
            flexDirection: this.posicion === 'horizontal' ? 'row' : 'column',
        })

        this._categorias.forEach((categoria) => {
            const $categoriaDiv = $('<div></div>') //va guardandose todo lo que se va a mostrar
                .css({
                    backgroundColor: categoria.color,
                    margin: '10px',
                    padding: '5px',
                    border: '1px solid #ccc',
                })

            const $tituloCategoria = $('<p></p>') //aqui tambien
                .text(categoria.nombre)
                .css({
                    cursor: 'pointer',
                    margin: 0,
                    padding: '5px',
                    fontWeight: 'bold',
                })
            $categoriaDiv.append($tituloCategoria) //aqui hace el appendchild pero en jquey

            const $enlacesList = $('<ul class="menus"></ul>').hide()
            categoria.enlaces.forEach((enlace) => {
                const $enlaceItem = $('<li></li>')
                const $enlaceElemento = $('<a></a>')
                    .text(enlace.nombre)
                    .css('color', enlace.color)

                if (enlace.modo === 'link' && enlace.link) {
                    $enlaceElemento.attr('href', enlace.link)
                } else if (enlace.modo === 'evento') {
                    $enlaceElemento.attr('href', '#').on('click', (e) => {
                        e.preventDefault()
                        const miEvento = new CustomEvent('menuClick',  {detail: {link: enlace.nombre}});
                        document.dispatchEvent(miEvento)
                        
                    });
                }
                
                

                $enlaceItem.append($enlaceElemento)
                $enlacesList.append($enlaceItem)
            })

            $categoriaDiv.append($enlacesList)
            $nav.append($categoriaDiv) //aqui ya esta todo puesto
        })
    }

    get todoMenu() {
        return {
            color: this.color,
            fuente: this.fuente,
            tamaño: this.tamaño,
            posicion: this.posicion,
            categorias: this.categorias,
        }
    }
}



document.addEventListener('menuClick', (event) => {
    //alert(event.detail.link)
    switch(event.detail.link)
    {
        case "Añadir Relleno": 
            document.getElementById("relleno").innerHTML += "<h1>relleno</h1>"
            break 
        case "Evento de prueba":
            alert("ALERTA")
            break
    }
});

const menuPrincipal = new Menu('lightblue', 'Arial', '16px', 'horizontal', '#nav')
const categoria1 = new Categoria('lightcoral', 'Categoría 1')
const categoria2 = new Categoria('lightgreen', 'Categoría 2')
const categoria3 = new Categoria('lightgreen', 'Categoría tercera')

const enlace1 = new Enlace('blue', 'Contacto', 'link', '#contacto')
const enlace2 = new Enlace('red', 'Evento de prueba', 'evento')
const enlace4 = new Enlace('red', 'Añadir Relleno', 'evento')
const enlace3 = new Enlace('grey', 'GitHub', 'link', 'https://github.com')

categoria1.agregarEnlace(enlace1)
categoria1.agregarEnlace(enlace2)
categoria2.agregarEnlace(enlace4)
categoria3.agregarEnlace(enlace3)
menuPrincipal.agregarCategoria(categoria1)
menuPrincipal.agregarCategoria(categoria2)
menuPrincipal.agregarCategoria(categoria3)

menuPrincipal.renderizarMenu()
