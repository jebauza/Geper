Geper.Cmp.Persona={

    cargar: function(config){
        var me = this;
        var objpersona= Geper.Cmp.StPersona;
        var stpers=objpersona.getStPersonas();
        var crudPersona= Geper.Cmp.CrudPersona;
        var encode = false;
        var local = true;
        var filtersp = new Ext.ux.grid.GridFilters({
            encode: encode,
            local: local,
            filters: [{
                type: 'string',
                dataIndex: 'nombre'
            }, {
                    type: 'string',
                    dataIndex: 'pri_apellido'
                },
                {
                    type: 'string',
                    dataIndex: 'seg_apellido'
                },{
                type: 'string',
                dataIndex: 'user_dominio'
            },
                {
                    type: 'string',
                    dataIndex: 'email'
                },
                {
                    type: 'list',
                    dataIndex: 'sexo',
                    options: ['F', 'M'],
                    phpMode: true
                },
                {
                    type: 'string',
                    dataIndex: 'no_solapin'
                },
                {
                    type: 'string',
                    dataIndex: 'ci'
                }]
        });
        var cmpers = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            new Ext.grid.CheckboxSelectionModel(),
            {header: 'CI',  dataIndex: 'ci',sortable: true,width:40},
            {header: 'Solapin', dataIndex: 'no_solapin', sortable: true,width:30},
            {header: 'Nombre', dataIndex: 'nombre', sortable: true,width:100},
            {header: 'Primer apellido', dataIndex: 'pri_apellido', sortable: true,width:70},
            {header: 'Segunto apellido', dataIndex: 'seg_apellido', sortable: true,width:70},
            {header: 'Sexo', dataIndex: 'sexo', sortable: true,width:40}

        ]);
        var pgpers = new Ext.PagingToolbar({
            store: stpers,
            displayInfo: true,
            width: '100%',
            displayMsg: '{0} - {1} de {2} Usuarios',
            emptyMsg: 'No existen usuarios del dominio a mostrar',
            pageSize: 10
        });
        this.detailsTemplate = new Ext.XTemplate(
            '<div class="details">',
            '<tpl for=".">',
            '<img class="detail-img" src="'+'datos/modulos/RRHH/personal/'+'{foto_nombre}"><div class="details-info">',
            '<b>Nombre:</b><br/>',
            '<span>{nombre_completo}</span><br/>',
            '<b>Usuario:</b><br/>',
            '<span>{user_dominio}</span><br/>',
            '<b>Correo:</b><br/>',
            '<span>{email}</span><br/></div>',
            '</tpl>',
            '</div>'
        );
        this.detailsTemplate.compile();
        var gdpers = new Ext.grid.GridPanel({
            tpl: me.detailsTemplate,
            plugins: [filtersp],
            frame: true,
            store: stpers,
            cm: cmpers,
           // bbar: pgpers,
            border: true,
            loadMask:true,
            width:'100%',
            layout:'fit',
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            })
        });
        gdpers.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
            var detailPanel = Ext.getCmp('detailPanel');
            me.detailsTemplate.overwrite(detailPanel.body, r.data);
        });


        var panel={
            title: 'Persona',
            layout:'border',
            items:[{
                region: 'center',
                layout:'fit',
                width: '100%',
                xtype: 'panel', // TabPanel itself has no title
                items:[   {
                    layout: 'card',
                    id: 'myCardLayout2',
                    activeItem: 0,
                    items: [
                        {
                            title: 'Persona',
                            height: 480,
                            layout:'fit',
                            width: '100%',
                            tbar:[
                                {
                                    text: 'Adicionar',
                                    iconCls: 'add',
                                    hidden:(config.indexOf(9)==-1),
                                    handler: function(){
                                        waddusuario=null;
                                        var waddusuario=crudPersona.getWinAdd(stpers);
                                        waddusuario.show();
                                    }
                                },
                                {
                                    text: 'Eliminar',
                                    iconCls: 'del',
                                    id:'btneliuser',
                                    hidden:(config.indexOf(10)==-1),
                                    disabled:true,
                                    handler: function () {
                                        Ext.Msg.confirm('Confirmacion', '\xbfEst\xe1 seguro de querer eliminar el usuario?', function (btn) {
                                            if (btn == "yes") {
                                                crudPersona.eliminarUsuario(gduser,stuser);
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
                                        var wasigrol=crudPersona.getwinRoles(record,stuser);
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
                                        crudPersona.getWinCambiarPass(gduser.getSelectionModel().getSelected().json.id_usuario);
                                    }
                                }
                            ],
                            items:[gdpers]
                        }
                       ]
                }]
            },
                {
                    id: 'detailPanel',
                    region: 'east',
                    split: true,
                    collapsible: true,
                    title: 'Detalles',
                    bodyStyle: {
                        background: '#ffffff',
                        padding: '7px'
                    },
                    html: 'Please select a book to see additional details.',
                    width: 500,
                    minWidth: 150,
                    collapsed:true
                    /*maxWidth: 250*/
                }]
        };
        gdpers.on({
            'rowclick': function () {
                Ext.getCmp('detailPanel').expand( true);
                Ext.getCmp('btneliuser').enable();
                Ext.getCmp('btnpassuser').enable();
                Ext.getCmp('btnasigrol').enable();
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
        {header: 'Fecha creacion', dataIndex: 'fecha_creacion'},
        {header: 'Activo', dataIndex: 'deleted'}
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
        plugins: [filters],
        autoExpandColumn: '1',
        frame: true,
        store: stuser,
        height: 445,
        width:1050,
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


