//所要处理的数据层
	var arr={
		menu:{
			'main':[
				 {
                name: '新建',
                 children:[{
                        name: '文件夹',
                        type:'floor',
                        callbackname: 'createFloder',
                            },
                            {
                        name: '文本',
                        type:'text',
                        callbackname: 'createText',
                            }
                    ],

            },
            {
                name: '上传文件',
                callbackname:'uploadingFile',
            },
            {
                name: '排序',
                callbackname: 'sort',
                children:[{
                		name: '按文件名',
                		callbackname: 'sortByName',	
                	},
                    {
                        name: '按文件类型',
                        callbackname: 'sortByType', 
                    }],
                
            }
				]
		,
		'file': [
            {
                name: '打开',
                callbackname: 'open',
            },
            {
                name: '编辑'
            },
            {
                name: '重命名',
                callbackname:'retnamenew'
            },
            {
                name: '删除',
                callbackname:'delet'
            },
            {
                name: '复制'
            },
            {
                name: '移动'
            }
        ]
	}
	};
    var data=[
    ];
    //对data的数据的操作 
    //获取点击的当前的数据
/**
 * 根据指定id获取对应数据
 */
function getInfo(id) {
    return data.filter(function(item) {
        return item.id == id;
    })[0];
}

/**
 * 根据指定id获取指定父级
 */
function getParent(id) {
    var info = getInfo(id);//根据id值获取的 data.list的 数据 
    if (info) {//paid 存的是 当前 元素对应的 父级的 id
        return getInfo(info.pid);
    }
}

/**
 * 根据指定id获取所有父级
 */
function getParents(id) {
    var parents = [];
    var parent = getParent(id);
    if (parent) {
        var parent2 = getParents(parent.id);
        if (parent2) {
            parents = parents.concat(parent2);
        }
        parents.push(parent);
    }
    return parents;
}
