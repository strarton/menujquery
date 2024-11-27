Como usar el componente menú:
1. HTML
   a. Se va a necesitar JQuery. Poner la etiqueta script, primero la clase y seguidamente la aplicacion donde se usen. Ejemplo:
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> <!--Este es el JQuery-->
      <script src="script.js"></script> <!--Este son las clases-->
      <script src="app.js"></script> <!--Este es la aplicacion o su archivo-->
   b. Va a tener que crear un div con un id con el nombre que quiera. Ejemplo:
      <div id="nav"></div> 
2. JS
   En su archivo tendrá que crear nuevos objetos, un objeto Menu, Categoria y Enlace.
     Menu: (color, fuente, tamaño, posicion, id). Ejemplo:
        const menuPrincipal = new Menu('lightblue', 'Arial', '16px', 'horizontal', '#nav')
     Categoria: (color, nombre). Ejemplo:
        const categoria1 = new Categoria('lightcoral', 'Categoría 1')
     Enlace: (color, nombre, modo, link = null, evento = null). Ejemplo:
        const enlace1 = new Enlace('blue', 'Contacto', 'link', '#contacto')
3. Ejecutar
   categoria1.agregarEnlace(enlace1)
categoria1.agregarEnlace(enlace2)
categoria2.agregarEnlace(enlace4)
categoria3.agregarEnlace(enlace3)
menuPrincipal.agregarCategoria(categoria1)
menuPrincipal.agregarCategoria(categoria2)
menuPrincipal.agregarCategoria(categoria3)

menuPrincipal.renderizarMenu()
