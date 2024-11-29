Como usar el componente menú:
1. HTML
   a. Se va a necesitar JQuery. Poner la etiqueta script, primero la clase y seguidamente la aplicacion donde se usen. Ejemplo:
   
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> <!--Este es el JQuery-->
      <script src="script.js"></script> <!--El archivo que se ha de descargar y ubicar debtro de la carpeta de trabajo-->
      <script src="app.js"></script> <!--Este es la aplicacion o el archivo que usará para crar y renderizar el componente-->
      
   b. Va a tener que crear un div con un id con el nombre que quiera. Ejemplo:
      <div id="nav"></div> 
      
2. JS
   a. En su archivo tendrá que crear nuevos objetos, un objeto Menu, Categoria y Enlace.
   
      Menu: (color, fuente, tamaño, posicion, id).
      - Color: Color de fondo del menú
      - Fuente: Fuente para todo el texto que se encuentre dentro del menú
      - Tamaño: tamaño de la letra para todo el menú
      - Posición: vertical/horizontal. La forma en la que se mostrarán las categorías
      - Id: El identificador del div al que se le quiere agregar el menú. Ha de ir SIEMPRE con un # delante.
      Ejemplo:
         const menuPrincipal = new Menu('lightblue', 'Arial', '16px', 'horizontal', '#nav')
      Categoria: (color, nombre).
      - Color: Color del fondo de la categoría
      - Nombre: Nombre de la categoría
      Ejemplo:
         const categoria1 = new Categoria('lightcoral', 'Categoría 1')
      Enlace: (color, nombre, modo, link) ó (color, nombre, modo, link)
      - Color: Modificará el color del texto del enlace
      - Nombre: Nombre del enlace o evento
      - Modo: link/evento. Dependiendo de como quiere que se comporte
      - Link: SOLO si está en modo link  puede introducir un enlace o anchor. Por defecto es null
      Ejemplo:
         const enlace1 = new Enlace('blue', 'Contacto', 'link', 'github.com')
         const enlace2 = new Enlace('red', 'Evento de prueba', 'evento')
   
   b. Para crear eventos ponga en 'nombre' el nombre del evento que desea crear y 'modo' en evento.
      Seguidamente, ha de crear un listener con un switch cuyo case ha de ser el nombre del evento:
   
      document.addEventListener('menuClick', (event) => {
        switch(event.detail.link){
          case "Evento de prueba":
            alert("Alerta de prueba")
            break
          }
      });
   
      Dentro del caso puede agregar lalógica que quiera para el evento.
   
3. Ejecución
   Para llevara cabo el menú habrá de añadir los enlaces y categorías correspondientes. Ejemplo:
   
      categoria1.agregarEnlace(enlace1)
      categoria1.agregarEnlace(enlace2)
      menuPrincipal.agregarCategoria(categoria1)
   
   Después, la última línea y más importante, renderizarlo. Ejemplo:
   
      menuPrincipal.renderizarMenu()
   
4.Post (CSS)
   Se puede modificar el componente y sus diversas partes. Para ello contamos con:
      El propio contenedor: 
         #nav {
            max-width: 70%;
         }
      Las categorias dentro del contenedor:
         #nav div{
             min-width: 90px;
             max-height: 30px;
         }
      El contenedor (ul) de los enlaces:
         .menus{
             background-color: aqua;
             text-decoration: none; /*Para eliminar el subrallado por defecto*/
         }
      Para cada elemento de lista (li){
         .menus li{
             list-style: none; /*Para eliminar el punto por defecto*/
         }
      }
      Y el propio enlace (a){
         .menus a{
            background-color: blueviolet;
         }

5. JSON (Via alternativa)
   Otra manera de hacerlo es generando un JSON con toda la información y poder renderizar el menú detodas formas.
   a. ara ello necesitaremos un JSON com constante y ponerle el nombre que queramos, Por ejemplo este:
   
   const menuStructure = [
    {
        color: "lightcoral",
        nombre: "Categoría 1",
        enlaces: [
            { color: "blue", nombre: "Contacto", modo: "link", link: "#contacto" },
            { color: "red", nombre: "Evento de prueba", modo: "evento", link: null }
        ]
    },
    {
        color: "lightgreen",
        nombre: "Categoría 2",
        enlaces: [
            { color: "red", nombre: "Añadir Relleno", modo: "evento", link: null }
        ]
    },
    {
        color: "lightgreen",
        nombre: "Categoría tercera",
        enlaces: [
            { color: "grey", nombre: "GitHub", modo: "link", link: "https://github.com" }
        ]
    }

   b. Seguidamente instanciamos un menú. Ejemplo:
   
   const menuPrincipal = new Menu('lightblue', 'Arial', '16px', 'vertical', '#nav')

   c. Tendremos que pasarle al menú que hemos creado  lascategorias y enlacesdela siguiente forma:

   menuPrincipal._categorias=menuStructure

   d. Último paso, renderizar. Ejemplo:

   menuPrincipal.renderizarMenu();

5. FINAL
Con estas dos maneras se puede crear un menú y parametrizar hasta el último de sus elementos sin utilizar tener que implementar lógica para ello.
   
