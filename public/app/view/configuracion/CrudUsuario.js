Geper.Cmp.CrudUsuario={
    selecionado:null,
    init: function(){

    },
    getWinAdd:function(st){
        this.base = Ext.getDom('base').value;
        var me=this;
        var form = new Ext.FormPanel({
            frame:true,
            url: this.base+'/configuracion/usuario/insertar',
            bodyStyle:'padding:5px 5px 0',
            defaultType: 'textfield',
            items: [
                { xtype: 'radiogroup',
                    fieldLabel: 'Tipo usuario',
                    items: [
                        {
                            boxLabel: 'Local',
                            name: 'conexion',
                            inputValue: 'local',
                            checked: true
                        },
                        {
                            boxLabel: 'Dominio',
                            name: 'conexion',
                            inputValue: 'dominio',
                            listeners:{
                                check: function(r, val){
                                    if(val)
                                    {
                                        var wpers=me.getwinPersonas();
                                        wpers.show();
                                        Ext.getCmp('fdusuario').disable();
                                    }
                                    else
                                    {
                                        form.getForm().reset();
                                        Ext.getCmp('fdusuario').enable();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'fdusuario',
                    autoHeight: true,
                    defaults: {width: 200},
                    width: 350,
                    defaultType: 'textfield', // each item will be a checkbox
                    items: [
                        {
                            fieldLabel: 'Usuario',
                            name: 'usuario',
                            id:'inputusuario',
                            allowBlank:false
                        },
                        {
                            fieldLabel: 'Contraseña',
                            name: 'password',
                            allowBlank:false,
                            inputType: 'password',
                            id:"id-pas"
                        },
                        {
                            name: 'id_persona',
                            allowBlank:false,
                            inputType: 'hidden',
                            value:'-1',
                            id:"id-persona"
                        },
                        {
                            fieldLabel: 'RE - Contraseña',
                            name: 're_password',
                            allowBlank:false,
                            inputType: 'password',
                            id:"id-pas2"
                        }
                    ]

                }
            ]
        });
        var win = new Ext.Window({
            layout:'fit',
            title: 'Adicionar Usuario',
            closeAction:'close',
            modal:true,
            items:[form],
            width: 400,
            height:240,
            buttons: [{
                text:'Aceptar',
                handler: function(){
                    if(Ext.getCmp('id-pas').getValue()!=Ext.getCmp('id-pas2').getValue())
                    {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Las contraseñas no coinsiden',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.ERROR
                        });
                    }
                    else
                    {
                        me.insertarUsuario(form,win,st)
                    }
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    form.getForm().reset();
                    win.close();
                }
            }]
        });
        return win;
    },
    insertarUsuario:function(form,win,st){
        if(!form.getForm().isValid())
        {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Existen campos inv\xe1lidos o vacios',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else
        {
            Ext.Msg.wait('Insertando usuario... por favor espere!');
            form.getForm().submit({
                success: function(form1,action){
                    Ext.Msg.hide();
                    form.getForm().reset();
                    win.close();
                    st.reload();
                    Ext.Msg.show({
                        title: 'Información',
                        msg: action.result.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function(form,action){
                    Ext.Msg.hide();
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Existen campos invalidos o vacios',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Fallo la comunicaci\xf3n con el servidor',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: action.result.msg,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                    }
                }
            });
        }
    },
    getUsuarios:function(){
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
    },
    getwinPersonas:function(){
        var me = this;
        var objpersona= Geper.Cmp.StPersona;
        var stpers=objpersona.getStPersDominio();
        var encode = false;
        var local = true;
        var filters = new Ext.ux.grid.GridFilters({
            encode: encode,
            local: local,
            filters: [{
                type: 'string',
                dataIndex: 'nombre_completo'
            }, {
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
            }]
        });
        var cmpers = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            new Ext.grid.CheckboxSelectionModel(),
            {header: 'CI',  dataIndex: 'ci',sortable: true,hidden:true},
            {header: 'Nombre', dataIndex: 'nombre_completo', sortable: true ,width:130},
            {header: 'Usuario', dataIndex: 'user_dominio', sortable: true ,width:60},
            {header: 'Correo', dataIndex: 'email', sortable: true},
            {header: 'Sexo', dataIndex: 'sexo', sortable: true,hidden:false,width:22},
            {header: 'Solapin', dataIndex: 'no_solapin', sortable: true,hidden:true}
        ]);
        var pgpers = new Ext.PagingToolbar({
            store: stpers,
            displayInfo: true,
            width: '100%',
            displayMsg: '{0} - {1} de {2} Productos',
            emptyMsg: 'No existen usuarios del dominio a mostrar',
            pageSize: 10
        });
        var gdpers = new Ext.grid.GridPanel({
            border: true,
            plugins: [filters],
            autoExpandColumn: '1',
            frame: true,
            store: stpers,
            height: 280,
            cm: cmpers,
            //bbar: pgpers,
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            })
        });
        var win = new Ext.Window({
            layout:'fit',
            title: 'Seleccionar usuario del dominio',
            closeAction:'hide',
            modal:true,
            items:[gdpers],
            width: 600,
            height:400,
            buttons: [{
                text:'Aceptar',
                disabled:true,
                id:'bt-aceptar-usuario',
                handler: function(){
                    me.selecionado = gdpers.getSelectionModel().getSelected().json;
                    Ext.getCmp('inputusuario').setValue(me.selecionado.user_dominio);
                    Ext.getCmp('id-pas').setValue(me.selecionado.user_dominio+'usuario'+me.selecionado.id_persona);
                    Ext.getCmp('id-pas2').setValue(me.selecionado.user_dominio+'usuario'+me.selecionado.id_persona);
                    Ext.getCmp('id-persona').setValue(me.selecionado.id_persona);
                    win.close();
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    win.close();
                }
            }]
        });
        gdpers.on({
            'rowclick': function () {
               Ext.getCmp('bt-aceptar-usuario').enable();
            }
        });
        return win;
    },
    eliminarUsuario:function(gd,st){
        Ext.Msg.wait('Eliminando el usuario... por favor espere!');
        this.base = Ext.getDom('base').value;
        Ext.Ajax.request({
         url: this.base+'/configuracion/usuario/eliminar',
         params: {
             id_usuario: gd.getSelectionModel().getSelected().json.id_usuario
         },
         callback: function (options, success, response) {
             Ext.Msg.hide();
           if (success) {
             var info = Ext.decode(response.responseText);
             if (info.success) {
                st.reload();
                Ext.Msg.show({
                    title: 'Información',
                    msg: info.msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
             }
             else
               Ext.example.msg('Error', info.msg);
           }
         }
        });
    },
    getwinRoles:function(record,st){
        var me = this;
        var objrol= Geper.Cmp.StRol;
        var strol=objrol.getStRol();
        var encode = false;
        var local = true;
        var filters = new Ext.ux.grid.GridFilters({
            encode: encode,
            local: local,
            filters: [{
                type: 'string',
                dataIndex: 'rol'
            }]
        });
        var cmrol = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            new Ext.grid.CheckboxSelectionModel(),
            {header: 'Rol',  dataIndex: 'rol',sortable: true}
        ]);
        var gdrol = new Ext.grid.GridPanel({
            border: true,
            loadMask:true,
            plugins: [filters],
            autoExpandColumn: '1',
            frame: true,
            store: strol,
            height: 445,
            width:1050,
            cm: cmrol,
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            })
        });
        var win = new Ext.Window({
            layout:'fit',
            title: 'Seleccionar el rol',
            closeAction:'hide',
            modal:true,
            items:[gdrol],
            width: 600,
            height:400,
            buttons: [{
                text:'Aceptar',
                disabled:true,
                id:'btn-asignar-rol',
                handler: function(){
                    var selecionado = gdrol.getSelectionModel().getSelected().json.id_rol;
                    me.asignarRol(record.id_usuario,selecionado,st);
                    win.close();
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    win.close();
                }
            }]
        });
        //gdrol.getSelectionModel().selectRow(0)
        gdrol.on({
            'rowclick': function () {
                Ext.getCmp('btn-asignar-rol').enable();
            }
        });
        return win;
    },
    asignarRol:function(user,rol,st){
        Ext.Msg.wait('Asignando rol... por favor espere!');
        this.base = Ext.getDom('base').value;
        Ext.Ajax.request({
            url: this.base+'/configuracion/usuario/asignar_rol',
            params: {
                user: user,
                rol:rol
            },
            callback: function (options, success, response) {
                Ext.Msg.hide();
                if (success) {
                    var info = Ext.decode(response.responseText);
                    if (info.success) {
                        st.reload();
                        Ext.Msg.show({
                            title: 'Información',
                            msg: info.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                    else
                        Ext.example.msg('Error', info.msg);
                }
            }
        });
    },
    getWinCambiarPass: function (id){
        var _this=this;
        var form = new Ext.form.FormPanel({
            url: this.base+'/configuracion/usuario/cambiar_pass',
            baseParams: {id_usuario:id},
            border:false,
            frame: true,
            width:300,
            height:110,
            bodyStyle: 'margin-top:15px;',
            labelWidth: 120,
            defaults: {
                xtype:'textfield',
                width: 150
            },
            items:[
                {
                    fieldLabel:'Nueva contrase\xf1a',
                    name:'clave',
                    allowBlank:false,
                    inputType: 'password',
                    id:"id-pass"
                },
                {
                    fieldLabel:'Repita contrase\xf1a',
                    name:'clave2',
                    allowBlank:false,
                    inputType: 'password',
                    id:"id-pass2"
                }
            ]
        });
        var win = new Ext.Window({
            title: 'Cambiar contrase\xf1a',
            modal:true,
            resizable : false,//evita que se cambie el tamanno de la ventana
            draggable:false,//evita que se cambie de posicion la ventana
            items:[form],
            buttons: [{text:'Aceptar',handler:
                function(){
                    if(Ext.getCmp('id-pass').getValue()==Ext.getCmp('id-pass2').getValue()){
                        _this.cambiarPass(form,win);}
                    else
                        Ext.MessageBox.alert('Error','Las contrase\xf1as no son las mismas');
                },scope:this},{text:'Cancel',handler:function(){win.close()}}]
        });

        win.show();
    },
    cambiarPass:function(form,win){
        if(!form.getForm().isValid())
            Ext.Msg.show({title:'Error',msg:'Existen campos inv\xe1lidos o vac\xedos',buttons:Ext.Msg.OK,icon:Ext.Msg.ERROR});
        else
        {
            Ext.Msg.wait('Cambiando contrase\xf1a... por favor espere!');
            form.getForm().submit({
                success: function (form, action) {
                    Ext.Msg.hide();
                    if (action.success) {
                        win.close();
                        //Ext.example.msg('Modificar', action.result.msg);
                        Ext.Msg.show({
                            title: 'Información',
                            msg: action.result.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                    Ext.example.msg('Modificar', action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.hide();
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Existen campos invalidos o vacios',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Fallo la comunicaci\xf3n con el servidor',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            Ext.Msg.show({
                                title: 'Error',
                                msg: action.result.msg,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                            break;
                    }
                }
            });
        }
    }
};
