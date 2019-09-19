Geper.Cmp.StUsuario={
    init: function(){
    },
    getStore:function(campos){
        this.base = Ext.getDom('base').value;

        var stuser = new Ext.data.JsonStore({
            autoLoad:true,
            fields: campos,
            url: this.base+'/configuracion/usuario/listar',
            root: 'data',
            idProperty: 'id_usuario'
        });
        return stuser;
    },
    getCamposUsuario:function(){
        return  ['id_usuario','id_rol','user','conexion','fecha_creacion','deleted'];
    },
    getStUsuario:function(){
        var campos=this.getCamposUsuario();
        return this.getStore(campos);
    }
};
