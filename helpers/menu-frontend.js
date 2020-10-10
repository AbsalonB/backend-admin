const getMenuFrontEnd =(role='USER_ROLE')=>{
   const menu = [
        {
          titulo: 'Dashboard',
          icono:'mdi mdi-gauge',
          submenu:[
            {titulo:'Main',url:'/'},
            {titulo:'ProgressBar',url:'progress'},
            {titulo:'Graficas',url:'grafica1'},
            {titulo:'Promesa',url:'promesa'}, 
            {titulo:'RXJS',url:'rxjs'} 
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono:'mdi mdi-folder-lock-open',
          submenu:[
            // {titulo:'Usuarios',url:'users'},
            {titulo:'Hospitales',url:'hospitals'},
            {titulo:'Médicos',url:'doctors'}, 
          ]
        }
      ];
    if( role === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({titulo:'usuarios',url:'users'})
    }
    return menu;
}

module.exports = {
    getMenuFrontEnd
}