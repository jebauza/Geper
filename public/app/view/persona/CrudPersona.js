Geper.Cmp.CrudPersona={
    selecionado:null,
    init: function(){

    },
    formUpImagen:function()
    {
        var me=this;
        var form = new Ext.FormPanel({
            frame:true,
            border:false,
            layout:'form',
            labelAlign: 'top',
            fileUpload: true,
            url: this.base+'/rrhh/personas/save-foto-temp',
            defaultType: 'textfield',
            items: [
                {
                xtype: 'fileuploadfield',
                id: 'form-file',
                emptyText: 'Select an image',
                fieldLabel: 'Foto',
                name: 'photo-path',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'salvar'
                }
            }]
        });

        var win = new Ext.Window({
            layout:'form',
            title: 'Seleccionar imagen',
            closeAction:'close',
            modal:true,
            items:[form],
            width: 300,
            height:140,
            buttons: [{
                text:'Aceptar',
                handler: function(){
                    form.getForm().submit({
                        success: function(fp, o){
                            win.close();
                            me.img = new Ext.XTemplate('<img src="{src}" id="foto" class="form-img">');
                            var x= Ext.getCmp('foto');
                            me.subida=o.result;
                            me.img.overwrite(x.body,  {src: o.result.dir})
                        },
                        failure: function (fp, o) {
                            Ext.Msg.show({
                                title: 'Error',
                                msg: o.result.msg,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }

                    });
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    form.getForm().reset();
                    win.close();
                }
            }]
        });
        win.show()
    },
    getWinAdd:function(st){
        this.base = Ext.getDom('base').value;
        var me=this;
        var form = new Ext.FormPanel({
            frame:true,
            layout:'form',
            labelAlign: 'top',
            url: this.base+'/rrhh/personas/insertar',
            bodyStyle:'padding:5px 5px 0',
            defaultType: 'textfield',
            items: [{
                xtype:'tabpanel',
                plain:true,
                activeTab: 0,
                height:360,
                defaults:{bodyStyle:'padding:10px'},
                items:[
                    me.tabDatosGenerales(),me.tabDatosCargo(),me.tabDatosOtros()]
            }]
        });
        me.win = new Ext.Window({
            layout:'form',
            title: 'Adicionar persona',
            closeAction:'close',
            modal:true,
            id:'winadd',
            items:[form],
            width: 950,
            height:450,
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
                        me.insertarPersona(form,me.win,st)
                    }
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    form.getForm().reset();
                    me.win.close();
                }
            }]
        });
        return me.win;
    },

    tabDatosGenerales:function(){
        var me=this;
        var oto=new Ext.Panel({
            width:110,
            bodyCssClass:'form-img',
            height:70,
            id:'foto',
            html:' <img id="foto" class="form-img" src="'+'datos/modulos/RRHH/personal/hombre.jpg">'
        });

        var btn=new Ext.Button({
        text:'cargar',
            listeners:{
                click:function(box,event){
                    me.formUpImagen()
                }
            }
        });
        me.pimg=new Ext.Panel({
            width:120,

            height:90,
           layout:'vbox',
            items:[oto,btn]
        });

        var sexo = new Ext.form.ComboBox({
            typeAhead: true,
            allowBlank: false,
            triggerAction: 'all',
            fieldLabel: 'Sexo',
            anchor: '95%',
            mode: 'local',
            name:'sexo',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['F', 'Femenino'],['M', 'Masculino']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var ecivil = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Estado Civil',
            anchor: '95%',
            mode: 'local',
            name:'estadocivil',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['S', 'Soltero'],['C', 'Casado'],['D', 'Divorciado']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var mun = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Municipio',
            anchor: '95%',
            mode: 'local',
            name:'municipioactual',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['PY', 'PLAYA'],['HE', 'HABANA DEL ESTE'],['PZ', 'PLAZA'],['M','MARIANAO'],
                    ['SM','SAN MIGUEL  DEL PADRON'],['C','CERRO'],['CH','CENTRO HABANA'],
                    ['DO','DIEZ DE OCTUBRE'],['L','LA LISA'],['HV','HABANA VIEJA'],['AN','ARROYO NARANJO'],
                    ['B','BOYEROS'],['R','REGLA'],['G','GUANABACOA']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var mun2 = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Municipio',
            anchor: '95%',
            mode: 'local',
            name:'municipiocarnet',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['Artemisa', 'Artemisa'],['HE', 'Hsbana del Este']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var prov2 = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Provincia',
            anchor: '95%',
            mode: 'local',
            name:'provinciacarnet',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['Habana', 'Habana'],['A', 'Artemisa']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var prov = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Provincia',
            anchor: '95%',
            mode: 'local',
            name:'provinciaactual',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['H', 'LA HABANA'],['A', 'Artemisa']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var tab=  new Ext.Panel({
            title: 'Generales',
            frame:true,
            bodyStyle:'margin-right:5px',
            layout:'column',
            items: [
                me.pimg
                ,{
                columnWidth: .25,
                layout: 'form',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        name: 'nombre',
                        anchor: '95%',
                        allowBlank: false
                    },
                    sexo
                ]},
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Primer apellido',
                            name: 'pri_apellido',
                            anchor: '95%',
                            allowBlank: false
                        },
                        ecivil

                    ]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Segundo apellido',
                        name: 'seg_apellido',
                        anchor: '95%',
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Usuario',
                        name: 'usuario',
                        anchor: '95%',
                        allowBlank: false
                    }
                    ]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'CI',
                            name: 'ci',
                            anchor: '95%',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Correo',
                            name: 'correo',
                            anchor: '95%',
                            allowBlank: false
                        }
                    ]
                },
                {
                    columnWidth:.6,
                    layout: 'form',
                    border: false,
                    cls:'column-style',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            width:'90%',
                            title: 'Dirección actual',
                            items: [
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ prov]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ mun]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Telefono contacto',
                                        name: 'telefonoactual',
                                        anchor: '95%',
                                        allowBlank: true
                                    }]},
                                { columnWidth:1,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            fieldLabel: 'Dirección Particular',
                                            name: 'direccionactual',
                                            anchor: '100%',
                                            allowBlank: true
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                {
                    columnWidth:.55,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            title: 'Dirección carnet',
                            items: [
                                { columnWidth:.5,
                                    layout: 'form',
                                    border: false,
                                    items: [ prov2]},
                                { columnWidth:.5,
                                    layout: 'form',
                                    border: false,
                                    items: [ mun2]},
                                { columnWidth:1,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            fieldLabel: 'Dirección Particular',
                                            name: 'direccioncarnet',
                                            anchor: '100%',
                                            allowBlank: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }]
        });

        return tab;
    },
    tabDatosCargo:function(){

        var cargo = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Cargo',
            anchor: '95%',
            mode: 'local',
            name:'cargo',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[64, 'CONTADOR "A"'],[823, 'CHOFER "D"'],[727,'JEFE DE GRUPO'],
                    [437,'ESPECIALISTA "A" EN CIENCIAS INFORMATICAS'],[306,'ESPECIALISTA "A" EN GESTION ECONÓMICA'],
                    [273,'SECRETARIA EJECUTIVA'],[353,'AGENTE DE SEGURIDAD Y PROTECCION']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });
        var gescala = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Grupo escala',
            anchor: '95%',
            mode: 'local',
            name:'grupoescala',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['S', 'Soltero'],['C', 'Casado'],['D', 'Divorciado']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });

        var cocup = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Categoria ocupacional',
            anchor: '95%',
            mode: 'local',
            name:'categoriaocupacional',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['T', 'TECNICO'],['O', 'OPERARIO'],['S', 'SERVICIOS'],['C', 'CUADRO'],['A', 'ADMINISTRATIVO']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });
        var perf = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Perfeccionamiento',
            anchor: '95%',
            mode: 'local',
            name:'perfeccionamiento',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['Artemisa', 'Artemisa'],['HE', 'Habana del Este']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var spago = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Sistema de pago',
            anchor: '95%',
            mode: 'local',
            name:'sistemapago',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[275, 275],[385, 385],[250,250],[455,455],[275,275]]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var subpago = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Subsistema de pago',
            anchor: '95%',
            mode: 'local',
            name:'subsistemapago',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [['Artemisa', 'Artemisa'],['HE', 'Hsbana del Este']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var escolar = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Escolaridad',
            anchor: '95%',
            mode: 'local',
            name:'escolaridad',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[1, 'NM'],[2, 'NMS'],[4, 'NS'],[3, 'PRIMARIA'],[5, '12 GRADO']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var gcientifico = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Grado científico',
            anchor: '95%',
            mode: 'local',
            name:'gradocientifico',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[1, 'Ninguno'],[2, 'Master'],[4, 'Doctor']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var area = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Area',
            anchor: '95%',
            mode: 'local',
            name:'area',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[408, 'DEPARTAMENTO ADMINISTRATIVO'],[9, 'DIRECCIÓN DE INFORMATICA'],[3, 'DIRECCION DE ECONOMIA'],
                    [686, 'DIRECCIÓN DE LOGÍSTICA'],[2,'DIRECCION GENERAL']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });

        var grupo = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Grupo',
            anchor: '95%',
            mode: 'local',
            name:'grupo',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[48, 'CONTABILIDAD'],[1822, 'GRUPO DE ASEGURAMIENTO Y TRANSPORTE'],[410,'DEPARTAMENTO ADMINISTRATIVO']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });

        var esc = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Salario escala',
            anchor: '95%',
            mode: 'local',
            name:'salarioescala',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[275, 275],[385, 385],[250,250],[455,455],[275,275]]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText',
            allowBlank: false
        });

        var tab=  new Ext.Panel({
            title: 'Cargo',
            frame:true,
            bodyStyle:'margin-right:5px',
            layout:'column',
            items: [

                {
                    columnWidth: .20,
                    layout: 'form',
                    border: false,
                    items: [
                        cargo,
                        area,
                    ]},
                {
                    columnWidth: .20,
                    layout: 'form',
                    border: false,
                    items: [
                        esc,
                        grupo

                    ]
                },
                {
                    columnWidth: .20,
                    layout: 'form',
                    border: false,
                    items: [
                        gescala,
                        spago
                    ]
                },
                {
                    columnWidth: .20,
                    layout: 'form',
                    border: false,
                    items: [
                        cocup,
                        subpago

                    ]
                },
                {
                    columnWidth: .20,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha alta',
                            name: 'fechaalta',
                            anchor: '95%',
                            allowBlank: false
                        }

                    ]
                },
                {
                    columnWidth:.5,
                    layout: 'form',
                    border: false,
                    margin:20 ,
                    cls:'column-style',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            title: 'Pagos adicionales',
                            items: [
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Horario irregular',
                                        name: 'horarioirregular',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Otros',
                                            name: 'Otros',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ perf,
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Asignacion por cargo',
                                            name: 'asignacioncargo',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Pago Adicional',
                                        name: 'pagoadicional',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Condiciones',
                                            name: 'condiciones',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]}
                            ]
                        }
                    ]
                },
                {
                    columnWidth:.5,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            width:'90%',
                            title: 'Escolaridad',
                            items: [
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        escolar,
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Año graduacion',
                                            name: 'annograduacion',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Especialidad',
                                        name: 'especialidad',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Idiomas',
                                            name: 'idioma',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]
                                },

                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Pais de graduación',
                                        name: 'paisgraduacion',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        gcientifico]}
                            ]
                        }
                    ]
                }]
        });
        return tab;
    },
    tabDatosOtros:function(){
        var color = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Color de la piel',
            anchor: '95%',
            mode: 'local',
            name:'piel',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[1, 'Negra'],[2, 'Mestiza'],[4, 'Blanca']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });
        var colorpelo = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            fieldLabel: 'Color del pelo',
            anchor: '95%',
            mode: 'local',
            name:'pelo',
            store: new Ext.data.ArrayStore({
                id: 0,
                fields: [
                    'myId',
                    'displayText'
                ],
                data: [[1, 'Negro'],[2, 'Rojo'],[3, 'Castaño'],[4, 'Rubio']]
            }),
            valueField: 'myId',
            editable:false,
            displayField: 'displayText'
        });

        var tab=  new Ext.Panel({
            title: 'Otros',
            frame:true,
            bodyStyle:'margin-right:5px',
            layout:'column',
            items: [
                {
                    columnWidth:.5,
                    layout: 'form',
                    border: false,
                    cls:'column-style',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            title: 'Datos de nacimiento',
                            items: [
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha de Nacimiento',
                                        name: 'fechanacimiento',
                                        anchor: '95%',
                                        format:'Y-m-d',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Tomo',
                                            name: 'tomo',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        {
                                        xtype: 'textfield',
                                        fieldLabel: 'Madre',
                                        name: 'madre',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Folio',
                                            name: 'folio',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'textfield',
                                        fieldLabel: 'Padre',
                                        name: 'padre',
                                        anchor: '95%',
                                        allowBlank: true
                                    },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Registro civil',
                                            name: 'registrocivil',
                                            anchor: '95%',
                                            allowBlank: true
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    columnWidth:.5,
                    layout: 'form',
                    border: false,
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            width:'90%',
                            title: 'Detalles físicos',
                            items: [
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [
                                        color,
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Talla cintura',
                                            name: 'cintura',
                                            anchor: '95%',
                                            allowBlank: true
                                        }
                                       ]},
                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ colorpelo,
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Talla zapatos',
                                            name: 'zapato',
                                            anchor: '95%',
                                            allowBlank: true
                                        }]
                                },

                                { columnWidth:.33,
                                    layout: 'form',
                                    border: false,
                                    items: [ {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Altura',
                                        name: 'alto',
                                        anchor: '95%',
                                        allowBlank: true
                                    } ,
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Talla camisa',
                                            name: 'camisa',
                                            anchor: '95%',
                                            allowBlank: true
                                        }
                                    ]}
                            ]
                        }
                    ]
                }]
        });

        return tab;
    },
    insertarPersona:function(form,win,st){
        /*if(!form.getForm().isValid())
        {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Existen campos inv\xe1lidos o vacios',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else*/
        if (true)
        {

          var me=this;
            Ext.Msg.wait('Insertando persona... por favor espere!');
            form.getForm().submit({
                params: {
                    imagen: me.subida.nom
                },
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
                    me.subida='';
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
                    me.subida='';
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
