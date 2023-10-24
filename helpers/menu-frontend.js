

const getMenuFrontend = ( rol = 'USER_ROLE' ) => {
    
  const  menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
      ]
    },

    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        // { title: 'Usuarios', url: 'usuarios' },
        // { title: 'Hospitales', url: 'hospitales' },
        // { title: 'Medicos', url: 'medicos' },
      ]
    }
];


if( rol === 'ADMIN_ROLE' ){
  menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' }),
  menu[1].submenu.unshift({ title: 'Hospitales', url: 'hospitales' })
}

if( rol === 'SECRE_ROLE'){
  menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' })
}


return menu;


}


module.exports = {
    getMenuFrontend,
}