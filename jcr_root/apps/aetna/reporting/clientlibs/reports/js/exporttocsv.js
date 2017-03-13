$(document).ready(function(){
	function JSON2CSV(objArray) {
	    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	
	    var str = '';
	    var line = '';
	    
        var head = column.report.columns;
        var hindex = new Array();
        for (var i = 0; i < head.length; i++) {
            line += head[i].definitions.name + ',';
            hindex[head[i].dataId] = i;
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
	    
	
	    for (var i = 0; i < array.length; i++) {
	        var line = '';
	
	        if ($("#quote").is(':checked')) {
	            for (var index in array[i]) {
	                var value = array[i][index] + "";
	                line += '"' + value.replace(/"/g, '""') + '",';
	            }
	        } else {
	        	for (var j = 0; j < head.length; j++) {
	        		var index = head[j].dataId;
	            	var value = array[i][index];
	            	if (value == undefined ){
	            		line += '"",';
	            	}else{
		                if ((typeof column.report.columns[hindex[index]].definitions.data) != "undefined" && 
		                    (typeof column.report.columns[hindex[index]].definitions.data.clientFilter == "function")){
		                	value = column.report.columns[hindex[index]].definitions.data.clientFilter(value);
		                }
		                value = value.replace(/\"/g,'""');
		            	if (typeof value == 'object'){
		            		line += '"' + value['display'] + '",';
		            	}else{
		            		line += '"' + value + '",';
		            	}
	            	}
	            }
	        }
	
	        line = line.slice(0, -1);
	        str += line + '\r\n';
	    }
	    return str;
	    
	}
	
	$("#downloadcsv").click(function() {
		var getUrl= document.URL.replace(/\.html.*/g,"") +"/jcr:content/report.data.json"
		$.ajax({url: getUrl,
				success : function(json){
					var csvData = JSON2CSV(json.hits);
				    var csvBlob = new Blob( [csvData],{ type: 'text/csv' });

					var link = document.createElement("a");
					link.setAttribute("href", window.URL.createObjectURL(csvBlob));
					link.setAttribute("download", "pageLink.csv");
					link.click();

				},
				error: function(){
					alert("error");
				}
			});
	    //var json = $.parseJSON($("#json").val());
	});
});