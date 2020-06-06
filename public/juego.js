    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const adCorrecto = document.getElementById('correcto')
    const ULTIMO_NIVEL = 10
    const btnEmpezar = document.getElementById('btnEmpezar')
    class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel,500)
        
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        adCorrecto.classList.add('hide')
        // añadimos la clsee css al elemento, clase que ya habiamos creado en css 
        this.toggleBtnEmpezar()          
        this.nivel = 1
        // javascript permite que si una variable tiene el mismo nombre que el valor, se guarde de la siguienten manera
        this.colores = {
        celeste,
        violeta,
        naranja,
        verde

        }
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
        }else{
        btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia(){
        // creando array aleatorio, arra(cantidad de elementos).fill(todos los elementos en 0 "definidos").map(n lleno de ceros, recorre cada uno y retorna math.random * numeros aleatorios entre 0 y 4)
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
        
    }
    siguienteNivel(){
        // subnivel arranca en 0
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        setTimeout(adCorrecto.classList.add('hide'),200)
    }

    transformarNumeroAColor(numero){
        switch (numero){
        case 0:
            return 'celeste'
        case 1:
            return 'violeta'
        case 2:
            return 'naranja'
        case 3:
            return 'verde'
        }
    }
    transformarColorANumero(color){
        switch (color){
        case 'celeste':
            return 0
        case 'violeta':
            return 1
        case 'naranja':
            return 2
        case 'verde':
            return 3
        }
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
        // tiene que ser let (de preferencia siempre usar let en un siclo for) lo que ocurre
        // es que se estaba quedando el ultimo color 
        // y para hacerlo mejor, colocar const para siempre hacer una reasignación de variable con const
        // const / let / var
        const color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(()=> this.iluminarColor(color), 1000 * i)
            
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=> this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
        
    }
    agregarEventosClick(){
        var self = this
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
    }
    // UTILIZAMOS BIND(THIS) CUANDO INICIALIZAMOS PARA SIEMPRE CONECTAR LOS ELEMENTOS AL JUEGO
    // para juntar el juego con los elementos que seleccionamos
    // utilziamos bind, porque lo que queremos es atar la funcion elegir color, con this(o sea el elemento seleccionado)
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color        
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){            
        this.subnivel++             
        if (this.subnivel === this.nivel){
            console.log("correcto");
            this.nivelCorrecto()
            
            this.nivel++
            this.eliminarEventosClick()
            if(this.nivel === (ULTIMO_NIVEL + 1)){                
            this.ganoElJuego()
            } else {
            setTimeout(this.siguienteNivel, 1500)
            // this.siguienteNivel()
            }

        }
        }else{
        // Perdió
        this.perdióElJuego()
        console.log('perdio');
        
        }
        
    }

    nivelCorrecto(){
        adCorrecto.classList.remove('hide')          
    }

    ganoElJuego(){
        Swal.fire(
        'Genial!',
        'Felicitaciones Ganaste el Juego!',
        'success')
        .then(this.inicializar())      
    }

    perdióElJuego(){
        Swal.fire(
        'Rayos!',
        'Lo lamentamos, perdiste el juego :(',
        'error')
        .then(()=>{
        this.eliminarEventosClick()
        this.inicializar()
        })   
    }


    }
    function empezarJuego() {
    window.juego = new Juego()
    }