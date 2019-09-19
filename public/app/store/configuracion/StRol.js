Geper.Cmp.StRol={
    init: function(){
    },
    getStore:function(campos){
        this.base = Ext.getDom('base').value;

        var strol = new Ext.data.JsonStore({
            autoLoad:true,
            fields: campos,
            url: this.base+'/configuracion/rol/listar',
            root: 'data',
            idProperty: 'id_rol'
        });
        return strol;
    },
    getCamposRol:function(){
        return  ['id_rol','rol','descripcion'];
    },
    getStRol:function(){
        var campos=this.getCamposRol();
        return this.getStore(campos);
    }
};
