Ext.ns('Geper.Cmp');
Geper.Cmp.Configuracion={

    cargar: function(config){
        var _this=this;
        var crudUsuario= Geper.Cmp.CrudUsuario;
        var objusuario= Geper.Cmp.StUsuario;
        var stuser=objusuario.getStUsuario();
        var crudRol= Geper.Cmp.CrudRol;
        var objrol= Geper.Cmp.StRol;
        var strol= objrol.getStRol();
        var waddusuario=crudUsuario.getWinAdd(stuser);
        var waddrol=crudRol.getWinAdd(strol);
        var encode = false;
        // configure whether filtering is performed locally or remotely (initially)
        var local = true;
        var filters = new Ext.ux.grid.GridFilters({
            // encode and local configuration options defined previously for easier reuse
            encode: encode, // json encode the filter query
            local: local,   // defaults to false (remote filtering)
            filters: [{
                type: 'string',
                dataIndex: 'id_rol'
            }, {
                type: 'string',
                dataIndex: 'user'
            },{
                type: 'list',
                dataIndex: 'conexion',
                options: ['local', 'dominio'],
                phpMode: true
            },
                {
                    type: 'list',
                    dataIndex: 'deleted',
                    options: ['0', '1'],
                    phpMode: true
                },
                {
                    type: 'date',
                    dataIndex: 'fecha_creacion'
                }]
        });
        var cmuser = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            new Ext.grid.CheckboxSelectionModel(),
            {header: 'Usuario',  dataIndex: 'user',sortable: true},
            {header: 'Rol',  dataIndex: 'id_rol',sortable: true},
            {header: 'Tipo', dataIndex: 'conexion', sortable: true },
            {header: 'Fecha creacion', dataIndex: 'fecha_creacion'}
        ]);
        var pguser = new Ext.PagingToolbar({
            store: stuser,
            displayInfo: true,
            width: '100%',
            displayMsg: '{0} - {1} de {2} Productos',
            emptyMsg: 'No existen usuarios usuarios a mostrar',
            pageSize: 10
        });
        var gduser = new Ext.grid.GridPanel({
            border: true,
            loadMask:true,
            plugins: [filters],
            autoExpandColumn: '1',
            frame: true,
            layout:'fit',
            store: stuser,
            width:'100%',
            cm: cmuser,
            //bbar: pgpers,
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            })
        });
        var cmrol = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            new Ext.grid.CheckboxSelectionModel(),
            {header: 'Rol',  dataIndex: 'rol',sortable: true}
        ]);
        var filtersrol=new Ext.ux.grid.GridFilters({
            encode: encode,
            local: local,
            filters: [{
                type: 'string',
                dataIndex: 'rol'
            }]
        });
        var gdrol = new Ext.grid.GridPanel({
            border: true,
            loadMask:true,
            plugins: [filtersrol],
            autoExpandColumn: '1',
            frame: true,
            store: strol,
            width:'100%',
            cm: cmrol,
            //bbar: pgpers,
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            })
        });
        var root = new Ext.tree.AsyncTreeNode({
            expanded: true,
            children: [
                {
                    text:'Usuario',
                    leaf:true,
                    id:'modulo_user'
                },{
                    text:'Rol',
                    leaf:true,
                    id:'modulo_rol'
                }]
        });
        var tree = new Ext.tree.TreePanel({     //step 1
            border: false,
            autoScroll:true,
            loader: new Ext.tree.TreeLoader(),
            root:root        //step 2
        });
        tree.on('click',function(node){
            if(node.id=='modulo_user')
            {
                Ext.getCmp('myCardLayout').getLayout().setActiveItem(0)
                stuser.reload();
            }
            if(node.id=='modulo_rol')
            {
                Ext.getCmp('myCardLayout').getLayout().setActiveItem(1)
                strol.reload();
            }
        });
        var panel={
            title: 'Configuración',
            layout:'border',
            items:[{
                region: 'center',
                layout:'fit',
                width: '100%',
                xtype: 'panel', // TabPanel itself has no title
                items:[   {
                    layout: 'card',
                    id: 'myCardLayout',
                    activeItem: 0,
                    items: [
                        {
                            title: 'Usuario',
                            layout:'fit',
                            width: '100%',
                            tbar:[
                                {
                                    text: 'Adicionar',
                                    iconCls: 'add',
                                   hidden:(config.indexOf(1)==-1),
                                    handler: function(){
                                        waddusuario=null;
                                        var waddusuario=crudUsuario.getWinAdd(stuser);
                                        waddusuario.show();
                                    }
                                },
                                {
                                    text: 'Eliminar',
                                    iconCls: 'del',
                                    id:'btneliuser',
                                    hidden:(config.indexOf(2)==-1),
                                    disabled:true,
                                    handler: function () {
                                        Ext.Msg.confirm('Confirmacion', '\xbfEst\xe1 seguro de querer eliminar el usuario?', function (btn) {
                                            if (btn == "yes") {
                                                crudUsuario.eliminarUsuario(gduser,stuser);
                                            }
                                        },this);
                                    }
                                },
                                {
                                    text: 'Asignar rol',
                                    iconCls: 'add16',
                                    id:'btnasigrol',
                                    hidden:(config.indexOf(7)==-1),
                                    disabled:true,
                                    handler: function () {
                                        var index = stuser.find('id_usuario', gduser.getSelectionModel().getSelected().json.id_usuario, 0, true, false);
                                        var record = stuser.getAt(index);
                                        var wasigrol=crudUsuario.getwinRoles(record,stuser);
                                        wasigrol.show();
                                    }
                                },
                                {
                                    text: 'Cambiar Contraseña',
                                    iconCls: 'add16',
                                    id:'btnpassuser',
                                    hidden:(config.indexOf(4)==-1),
                                    disabled:true,
                                    handler:function(){
                                        crudUsuario.getWinCambiarPass(gduser.getSelectionModel().getSelected().json.id_usuario);
                                    }
                                }
                            ],
                            items:[gduser]
                        },
                        {
                            title: 'Rol',
                            layout:'fit',
                            width: '100%',
                            tbar:[
                                {
                                    text: 'Adicionar',
                                    iconCls: 'add',
                                    hidden:(config.indexOf(5)==-1),
                                    handler: function(){
                                        waddrol=null;
                                        var waddrol=crudRol.getWinAdd(strol);
                                        waddrol.show();
                                    }
                                },{
                                    text: 'Modificar',
                                    iconCls: 'edit',
                                    id:'btnmodrol',
                                    hidden:(config.indexOf(8)==-1),
                                    disabled:true,
                                    handler: function(){
                                        waddrol=null;
                                        var index = strol.find('id_rol', gdrol.getSelectionModel().getSelected().json.id_rol, 0, true, false);
                                        var record = strol.getAt(index);
                                        var waddrol=crudRol.getWinMod(strol,record);
                                        waddrol.show();
                                    }
                                },{
                                    text: 'Eliminar',
                                    iconCls: 'del',
                                    id:'btnelirol',
                                    disabled:true,
                                    hidden:(config.indexOf(6)==-1),
                                    handler: function () {
                                        Ext.Msg.confirm('Confirmacion', '\xbfEst\xe1 seguro de querer eliminar el rol?', function (btn) {
                                            if (btn == "yes") {
                                                crudRol.eliminarRol(gdrol,strol);
                                            }
                                        },this);
                                    }
                                }
                            ],
                            items:[gdrol]
                        }]
                }]
            },
                {
                    region: 'west',
                    collapsible: false,
                    title: 'Navigation',
                    width: 200,
                    items:[tree]
                }]
        };
        gduser.on({
            'rowclick': function () {
                //Ext.getCmp('btnmoduser').enable();
                Ext.getCmp('btneliuser').enable();
                Ext.getCmp('btnpassuser').enable();
                Ext.getCmp('btnasigrol').enable();
            }
        });
        gdrol.on({
            'rowclick': function () {
                //Ext.getCmp('btnmoduser').enable();
                Ext.getCmp('btnmodrol').enable();
                Ext.getCmp('btnelirol').enable();
            }
        });
        return panel;
    }
};
function getUsuarios(){
    var me = this;
    var objusuario= Geper.Cmp.StUsuario;
    var stuser=objusuario.getStUsuario();
    var encode = false;
    var local = true;
    var filters = new Ext.ux.grid.GridFilters({
        encode: encode,
        local: local,
        filters: [{
            type: 'string',
            dataIndex: 'id_rol'
        }, {
            type: 'string',
            dataIndex: 'user'
        },{
            type: 'list',
            dataIndex: 'conexion',
            options: ['local', 'dominio'],
            phpMode: true
        },
            {
                type: 'list',
                dataIndex: 'deleted',
                options: ['0', '1'],
                phpMode: true
            },
            {
                type: 'date',
                dataIndex: 'fecha_creacion'
            }]
    });
    var cmuser = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        new Ext.grid.CheckboxSelectionModel(),
        {header: 'Usuario',  dataIndex: 'user',sortable: true},
        {header: 'Rol',  dataIndex: 'id_rol',sortable: true},
        {header: 'Tipo', dataIndex: 'conexion', sortable: true },
        {header: 'Fecha creacion', dataIndex: 'fecha_creacion'},
        {header: 'Activo', dataIndex: 'deleted'}
    ]);
    var pguser = new Ext.PagingToolbar({
        store: stuser,
        displayInfo: true,
        width: '100%',
        displayMsg: '{0} - {1} de {2} Productos',
        emptyMsg: 'No existen usuarios a mostrar',
        pageSize: 10
    });

    var gduser = new Ext.grid.GridPanel({
        border: true,
        plugins: [filters],
        autoExpandColumn: '1',
        frame: true,
        store: stuser,
        layout:'fit',
        width: '100%',
        cm: cmuser,
        //bbar: pgpers,
        viewConfig: {
            forceFit: true
        },
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true
        })
    });
    return gduser;
}

