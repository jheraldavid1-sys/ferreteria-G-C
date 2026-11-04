const productos = [
    {id:1, nombre:"Martillo de acero", precio:45, cat:"herramientas", imagen:"fotos/martillo.jpg.jfif"},
    {id:2, nombre:"Juego de Destornilladores", precio:65, cat:"herramientas", imagen:"fotos/destornilladores.jpg.jfif"},
    {id:3, nombre:"Juego de Llaves", precio:35, cat:"herramientas", imagen:"fotos/llaves.jpg.jfif"},
    {id:4, nombre:"Taladro inalámbrico", precio:180, cat:"herramientas", imagen:"fotos/taladro.jpg.jfif"},
    {id:5, nombre:"Serrucho para metal", precio:28, cat:"herramientas", imagen:"fotos/serrucho.jpg.jfif"},
    {id:6, nombre:"Cemento CAMBA (50kg)", precio:28, cat:"materiales", imagen:"fotos/cemento.jpg.jfif"},
    {id:7, nombre:"Ladrillo hueco c/u", precio:2, cat:"materiales", imagen:"fotos/ladrillo.jpg.jfif"},
    {id:8, nombre:"Varilla corrugada", precio:15, cat:"materiales", imagen:"fotos/varilla.jpg.jfif"},
    {id:9, nombre:"Alambre negro (rollo)", precio:32, cat:"materiales", imagen:"fotos/alambre.jpg.jfif"},
    {id:10, nombre:"Alargue con USB", precio:85, cat:"electricidad", imagen:"fotos/alargue.jpg.jfif"},
    {id:11, nombre:"Foco LED ahorrador", precio:12, cat:"electricidad", imagen:"fotos/foco.jpg.jfif"},
    {id:12, nombre:"Tomacorriente doble", precio:15, cat:"electricidad", imagen:"fotos/toma.jpg.jfif"},
    {id:13, nombre:"Tubería PVC (metro)", precio:22, cat:"plomeria", imagen:"fotos/tuberia.jpg.jfif"},
    {id:14, nombre:"Llave de paso bronce", precio:35, cat:"plomeria", imagen:"fotos/llave_paso.jpg.jfif"},
    {id:15, nombre:"Codos y uniones PVC", precio:5, cat:"plomeria", imagen:"fotos/codos.jpg.jfif"},
    {id:16, nombre:"Pegamento para PVC", precio:18, cat:"plomeria", imagen:"fotos/pegamento.jpg.jfif"}
];

let carrito = [];
const NUMERO_WHATSAPP = "67464984";

function irAPagina(nombrePagina) {
    
    document.querySelectorAll('.boton-menu').forEach(boton => {
        boton.classList.remove('activo');
    });
    
    document.querySelectorAll(`[data-pagina="${nombrePagina}"]`).forEach(boton => {
        if (boton.classList.contains('boton-menu')) {
            boton.classList.add('activo');
        }
    });
    
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    
    document.getElementById(nombrePagina).classList.add('activa');
    
    window.scrollTo(0, 0);
}


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.boton-menu').forEach(boton => {
        boton.addEventListener('click', function() {
            const pagina = this.getAttribute('data-pagina');
            irAPagina(pagina);
        });
    });

    document.querySelector('.boton-ver').addEventListener('click', function() {
        irAPagina('productos');
    });

    mostrarProductos('todos');
});

function mostrarProductos(categoria) {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    const filtrados = categoria === 'todos' ? productos : productos.filter(p => p.cat === categoria);
    
    filtrados.forEach(p => {
        lista.innerHTML += `
            <div class="tarjeta">
                <img src="${p.imagen}" alt="${p.nombre}" class="foto-producto">
                <h3>${p.nombre}</h3>
                <p class="precio">Bs. ${p.precio}</p>
                <button class="btn-agregar" data-id="${p.id}">➕ Agregar al carrito</button>
            </div>`;
    });
    asignarBotonesAgregar();
}

function asignarBotonesAgregar() {
    document.querySelectorAll('.btn-agregar').forEach(b => {
        b.onclick = () => agregarAlCarrito(parseInt(b.dataset.id));
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filtro')) {
        document.querySelectorAll('.filtro').forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        mostrarProductos(e.target.dataset.cat);
    }
});

function agregarAlCarrito(id) {
    carrito.push(productos.find(p => p.id === id));
    actualizarCarrito();
}
function quitarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}
function actualizarCarrito() {
    const items = document.getElementById('lista-items');
    items.innerHTML = '';
    let total = 0;
    carrito.forEach((item, i) => {
        total += item.precio;
        items.innerHTML += `
            <div class="item">
                <span>${item.nombre} — Bs. ${item.precio}</span>
                <button class="btn-quitar" data-i="${i}">✕</button>
            </div>`;
    });
    document.getElementById('numero-carrito').textContent = carrito.length;
    document.getElementById('precio-total').textContent = total;
    document.querySelectorAll('.btn-quitar').forEach(b => {
        b.onclick = () => quitarDelCarrito(parseInt(b.dataset.i));
    });
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'abrir-carrito') {
        document.getElementById('ventana-carrito').classList.add('mostrar');
    }
    if (e.target.id === 'cerrar-carrito') {
        document.getElementById('ventana-carrito').classList.remove('mostrar');
    }
});

document.addEventListener('click', function(e) {
    if (e.target.id === 'enviar-whatsapp') {
        if (!carrito.length) return alert('El carrito está vacío');
        let mensaje = '¡Hola! Quiero pedir a Ferretería G&C:\n\n';
        let total = 0;
        carrito.forEach(item => {
            mensaje += `${item.nombre} — Bs. ${item.precio}\n`;
            total += item.precio;
        });
        mensaje += `\n💰 TOTAL: Bs. ${total}`;
        const numeroLimpio = NUMERO_WHATSAPP.replace(/\D/g, '');
        window.open(`https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }
});